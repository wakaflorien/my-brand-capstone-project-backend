const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactController');
const verifyJWT = require('../../middleware/verifyJWT')

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - query
 *       properties:
 *         name:
 *           type: string
 *           description: your name
 *         email:
 *           type: string
 *           description: your email
 *         query:
 *           type: string
 *           description: your query
 *       example:
 *         name: RAF
 *         email: RAF@query.com 
 *         query: Create an easy way of doing registration
 */
router.route('/')
 /**
 * @swagger
 * /contact:
 *   post:
 *     summary: Create a new Query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The query was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
*/
.post(contactController.addQ)
router.use(verifyJWT)
router.route('/')
/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Getting all queries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: All available queries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/      
.get(contactController.getAllQs) 

router.route('/:id')
    /**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Remove query by id
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The query id
 * 
 *     responses:
 *       200:
 *         description: The query was deleted
 *       404:
 *         description: The query was not found
 */
 .delete(contactController.deleteQs)

module.exports = router;