const router = require('express').Router();
const UserRoutes = require('./users');
const ThoughtRoutes = require('./thoughts');

router.use('/users', UserRoutes);
router.use('/thoughts', ThoughtRoutes);

module.exports = router;