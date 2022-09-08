const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')


router.post('/sign-in', authController.signIn );
router.post('/sign-up', authController.signUp);
router.post('/token-refresh', authController.auth, authController.tokenRefresh);
router.post('/logout', authController.auth, authController.logout)

module.exports = router;
