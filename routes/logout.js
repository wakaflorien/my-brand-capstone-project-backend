const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user 
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         email: name@gmail.com
 *         password: test1231
 */

/**
 * @swagger
 * /logout:
 *  get:
 *    tags:
 *    - "auth"
 *    summary: Logs out current logged in user session 
 *    description: ""
 *    produces:
 *    - "application/json"
 *    - "application/xml"
 *    responses:
 *      '204':
 *        description: Successfully logged out
 *        content: []
 */
router.get('/', logoutController.handleLogout)
    
module.exports = router;