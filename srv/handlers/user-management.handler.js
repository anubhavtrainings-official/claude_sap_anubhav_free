module.exports = (srv) => {
    const { Users, UserRoles, Roles } = srv.entities;

    // ─── lockUser ─────────────────────────────────────────────────────────────
    srv.on('lockUser', async (req) => {
        const { userId } = req.data;
        const user = await SELECT.one.from(Users).where({ ID: userId });
        if (!user) return req.error(404, 'User not found');
        if (user.isLocked) return false;
        await UPDATE(Users).set({ isLocked: true }).where({ ID: userId });
        return true;
    });

    // ─── unlockUser ───────────────────────────────────────────────────────────
    srv.on('unlockUser', async (req) => {
        const { userId } = req.data;
        const user = await SELECT.one.from(Users).where({ ID: userId });
        if (!user) return req.error(404, 'User not found');
        await UPDATE(Users).set({ isLocked: false }).where({ ID: userId });
        return true;
    });

    // ─── createUser ───────────────────────────────────────────────────────────
    srv.on('createUser', async (req) => {
        const { firstName, lastName, email, roleId } = req.data;

        const existing = await SELECT.one.from(Users).where({ loginName: email });
        if (existing) return req.error(409, 'User already exists');

        const newUser = { firstName, lastName, loginName: email, isLocked: false };
        await INSERT.into(Users).entries(newUser);

        const created = await SELECT.one.from(Users).where({ loginName: email });

        if (roleId && created) {
            const role = await SELECT.one.from(Roles).where({ code: roleId });
            if (role) {
                await INSERT.into(UserRoles).entries({ user_ID: created.ID, role_code: roleId });
            }
        }

        return created;
    });

    // ─── resetPassword ────────────────────────────────────────────────────────
    srv.on('resetPassword', async (req) => {
        const { userId, newPassword } = req.data;
        if (!newPassword) return req.error(400, 'Password must not be empty');
        if (newPassword.length < 8) return req.error(400, 'Password must be at least 8 characters');

        const user = await SELECT.one.from(Users).where({ ID: userId });
        if (!user) return req.error(404, 'User not found');

        return true;
    });

    // ─── assignRole ───────────────────────────────────────────────────────────
    srv.on('assignRole', async (req) => {
        const { userId, roleId } = req.data;

        const role = await SELECT.one.from(Roles).where({ code: roleId });
        if (!role) return req.error(404, 'Role not found');

        await INSERT.into(UserRoles).entries({ user_ID: userId, role_code: roleId });
        return true;
    });

    // ─── unassignRole ─────────────────────────────────────────────────────────
    srv.on('unassignRole', async (req) => {
        const { userId, roleId } = req.data;

        const assignment = await SELECT.one.from(UserRoles).where({ user_ID: userId, role_code: roleId });
        if (!assignment) return req.error(404, 'Role assignment not found');

        await DELETE.from(UserRoles).where({ user_ID: userId, role_code: roleId });
        return true;
    });
};
