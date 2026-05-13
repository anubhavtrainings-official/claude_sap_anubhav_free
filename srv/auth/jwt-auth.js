const cds = require('@sap/cds');
const jwtHelper = require('./jwt');

module.exports = async function jwtAuth(req, res, next) {
    const authHeader = req.headers && req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = new cds.User.Anonymous();
        return next();
    }

    const token = authHeader.slice(7).trim();

    let payload;
    try {
        payload = jwtHelper.verify(token, 'access');
    } catch (err) {
        return res.status(401).json({ error: 'invalid_token', message: err.message });
    }

    try {
        const rows = await SELECT.from('anubhav.claude.UserRoles').where({ user_ID: payload.sub });
        const roles = {};
        for (const r of rows) roles[r.role_code] = true;
        req.user = new cds.User({ id: payload.sub, roles });
        return next();
    } catch (err) {
        return res.status(500).json({ error: 'auth_lookup_failed', message: err.message });
    }
};
