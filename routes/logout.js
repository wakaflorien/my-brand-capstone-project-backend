const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const verifyJWT = require('../middleware/verifyJWT')
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
 *      '401':
 *        description:Unauthorized
 *      '204':
 *        description: No content
 *        content: []
 */
router.use(verifyJWT)
router.get('/', logoutController.handleLogout)
    
module.exports = router;