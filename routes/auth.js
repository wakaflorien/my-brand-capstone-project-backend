const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const updateController = require('../controllers/updateController')
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
 * /auth:
 *  post:
 *    tags:
 *    - "auth"
 *    summary: Enter your credentials 
 *    description: Use to Authenticate ypurself
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: login Success
 *      '400':
 *        description: username and password are required
 *      '404':
 *        description: user not found
 */
router.post('/', authController.handleLogin)
/**
 * @swagger
 * /auth/user:
 *  put:
 *    summary: Update the user information
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 *      500:
 *        description: Internal server error
 */
router.use(verifyJWT)
router.put('/user', updateController.handleUpdateUser)
    
module.exports = router;
