const userController = require('../controllers/users');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.user_signup)

router.delete('/:userId', checkAuth, userController.user_delete)

router.get('/', checkAuth, userController.users_get_all)

router.post('/login', userController.user_login)

module.exports = router;