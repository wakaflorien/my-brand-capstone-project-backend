const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/postsController');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyJWT = require('../../middleware/verifyJWT')

const multer = require('multer')
// upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`,
    limits: {
        files: 5, // allow up to 5 files per request,
        fieldSize: 5 * 1024 * 1024 // 2 MB (max file size)
    },
    fileFilter: (req, file, cb) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image are allowed.'), false);
        }
        cb(null, true);
    }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - postBody
 *       properties:
 *         title:
 *           type: string
 *           description: Title of an article 
 *         postBody:
 *           type: string
 *           description: Article body
 *         blogImage:
 *           type: string
 *           description: The blog Image
 *       example:
 *         title: Total projects in Rda
 *         postBody: Some words
 *   
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Getting all articles
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: All available posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/                                              
router.route('/')
    .get(postsController.getAllPosts)

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The Article description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */

 router.use(verifyJWT)
router.route('/:id')
    .get(postsController.getPost)
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
 .delete(verifyRoles(ROLES_LIST.Admin), postsController.deletePost)
 /**
 * @swagger
 * /posts/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Blog]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */
    .put(verifyRoles(ROLES_LIST.Admin),postsController.updatePost)
router.use(verifyJWT)
router.route('/')
    /**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new Articles
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
*/
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),postsController.createNewPost) //upload.single('blogImage'),

module.exports = router;