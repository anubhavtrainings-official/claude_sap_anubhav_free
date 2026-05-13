const jwt = require('../auth/jwt');
const password = require('../auth/password');

const Users           = 'anubhav.claude.Users';
const UserCredentials = 'anubhav.claude.UserCredentials';
const UserRoles       = 'anubhav.claude.UserRoles';

const loadRoles = async (userId) => {
    const rows = await SELECT.from(UserRoles).where({ user_ID: userId });
    return rows.map((r) => r.role_code);
};

module.exports = (srv) => {

    // ─── login ────────────────────────────────────────────────────────────────
    srv.on('login', async (req) => {
        const { loginName, password: plain } = req.data;

        if (!loginName || !plain) {
            return req.error(400, 'loginName and password are required');
        }

        const user = await SELECT.one.from(Users).where({ loginName });
        if (!user || user.isLocked) return req.error(401, 'Invalid credentials');

        const creds = await SELECT.one.from(UserCredentials).where({ user_ID: user.ID });
        if (!creds || !creds.passwordHash) return req.error(401, 'Invalid credentials');

        const ok = await password.compare(plain, creds.passwordHash);
        if (!ok) {
            await UPDATE(UserCredentials)
                .set({ failedAttempts: (creds.failedAttempts || 0) + 1 })
                .where({ ID: creds.ID });
            return req.error(401, 'Invalid credentials');
        }

        await UPDATE(UserCredentials)
            .set({ failedAttempts: 0, lastLoginAt: new Date().toISOString() })
            .where({ ID: creds.ID });

        const roles = await loadRoles(user.ID);
        const access  = jwt.sign({ sub: user.ID, roles }, 'access');
        const refresh = jwt.sign({ sub: user.ID },        'refresh');

        return { access, refresh, expiresIn: jwt.accessTtlSeconds };
    });

    // ─── refresh ──────────────────────────────────────────────────────────────
    srv.on('refresh', async (req) => {
        const { refreshToken } = req.data;
        if (!refreshToken) return req.error(400, 'refreshToken is required');

        let payload;
        try {
            payload = jwt.verify(refreshToken, 'refresh');
        } catch (err) {
            return req.error(401, 'Invalid refresh token');
        }

        const user = await SELECT.one.from(Users).where({ ID: payload.sub });
        if (!user) return req.error(404, 'User not found');
        if (user.isLocked) return req.error(403, 'User is locked');

        const roles = await loadRoles(user.ID);
        const access     = jwt.sign({ sub: user.ID, roles }, 'access');
        const newRefresh = jwt.sign({ sub: user.ID },        'refresh');

        return { access, refresh: newRefresh, expiresIn: jwt.accessTtlSeconds };
    });

    // ─── me ───────────────────────────────────────────────────────────────────
    srv.on('me', async (req) => {
        const id = req.user && req.user.id;
        if (!id || id === 'anonymous') return req.error(401, 'Not authenticated');

        const user = await SELECT.one.from(Users).where({ ID: id });
        if (!user) return req.error(404, 'User not found');

        const roles = await loadRoles(user.ID);

        return {
            id:        user.ID,
            loginName: user.loginName,
            firstName: user.firstName,
            lastName:  user.lastName,
            roles,
        };
    });
};
