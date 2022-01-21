const express = require('express');
const router = express.Router();
const commentsController = require('../../controllers/commentsController');
const verifyJWT = require('../../middleware/verifyJWT')

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - message
 *         - commentator
 *       properties:
 *         message:
 *           type: string
 *           description: comment message
 *         commentator:
 *           type: string
 *           description: who comments
 *       example:
 *         message: Create an easy way of doing registration
 *         commentator: RAF 
 */
router.route('/')
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Getting all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: All available comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/  
.get(commentsController.getAllComments)

router.route('/')
    /**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal server error
*/   
    .post(commentsController.addComment)

router.use(verifyJWT)
router.route('/:id')
    /**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of comment to be deleted
 *     responses:
 *       200:
 *         description: successfully deleted!
 *         $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 */
     .delete(commentsController.deleteComments)

module.exports = router;