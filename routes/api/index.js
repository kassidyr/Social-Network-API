const router = require('express').Router();
const UserRoutes = require('./users');
router.use('/users', UserRoutes);

module.exports = router;