const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

const hasRole = (roles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.role) {
            return res.status(403).send('Forbidden: No role assigned');
        }
        if (roles.includes(req.session.role)) {
            return next();
        }
        res.status(403).send('Forbidden: Insufficient privileges');
    };
};

module.exports = {
    isAuthenticated,
    hasRole
};
