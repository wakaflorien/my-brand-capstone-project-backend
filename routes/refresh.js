const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshTokenController');
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
 * /refresh:
 *  get:
 *    tags:
 *    - "auth"
 *    summary: Get refresh token 
 *    description: Use you access token to obtain refresh token
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: access token
 *    responses:
 *      '200':
 *        description: Generated refresh token
 *      '403':
 *        description: Forbidden!
 *      '401':
 *        description: Unauthorized
*/
// router.use(verifyJWT)
router.get('/', refreshController.handleRefreshToken)
    
module.exports = router;