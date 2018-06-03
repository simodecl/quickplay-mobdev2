const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();
const passport = require('passport');

const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
  });
  
/*
Controllers
*/
const authController = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const profileController = require('./controllers/profileController');
const gamertagController = require('./controllers/gamertagController');
const uploadController = require('./controllers/uploadController');
const userController = require('./controllers/userController');

/*
Routes
*/

//Category routes
router.get('/categories', categoryController.get_categories);
router.get('/categories/:id', categoryController.get_category);
router.post('/categories/', auth.authenticateJwt(), categoryController.category_create_post);

//Post routes
router.get('/posts', postController.get_posts);
router.get('/posts/category/:category', postController.get_posts_by_category);
router.get('/posts/:postId', postController.get_post);
router.post('/posts/:category', auth.authenticateJwt(), postController.post_create_post);
router.get('/posts/:postId/update', postController.post_update_get);
router.put('/posts/:postId', auth.authenticateJwt(), postController.post_update_put);
router.delete('/posts/:postId', auth.authenticateJwt(), postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', auth.authenticateJwt(), postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', auth.authenticateJwt(), postController.post_softundelete_patch);
router.patch('/posts/like/:postId', auth.authenticateJwt(), postController.post_like_post);

//Comment routes
router.get('/comments', commentController.get_comments);
router.get('/comments/:postId', commentController.get_comments_by_post);
router.post('/comments', auth.authenticateJwt(), commentController.comment_create_comment);
router.put('/comments/:commentId', auth.authenticateJwt(), commentController.comment_update_put);
router.patch('/comments/like/:commentId', auth.authenticateJwt(), commentController.comment_like_comment);
router.delete('/comments/:commentId', auth.authenticateJwt(), commentController.comment_delete_delete);
router.patch('/comments/:commentId/softdelete', auth.authenticateJwt(), commentController.comment_softdelete_patch);
router.patch('/comments/:commentId/softundelete', auth.authenticateJwt(), commentController.comment_softundelete_patch);

//User router
router.get('/user', auth.authenticateJwt(), userController.get_user);
router.patch('/user/update', auth.authenticateJwt(), userController.user_update_patch);

//Profile routes
router.get('/profile', auth.authenticateJwt(), profileController.get_profile);
router.delete('/profile', auth.authenticateJwt(), profileController.profile_delete_delete);
router.post('/profile', auth.authenticateJwt(), profileController.profile_create_post);
router.patch('/profile/update', auth.authenticateJwt(), profileController.profile_update_patch);
router.get('/profile/handle/:handle', profileController.get_profile_by_handle);
router.get('/profile/user/:user_id', profileController.get_profile_by_user_id);
router.get('/profiles', profileController.get_profiles);
router.patch('/upload', auth.authenticateJwt(), multer.single('file'), uploadController.upload_image);

//Gamertag routes
router.get('/gamertags', auth.authenticateJwt(), gamertagController.get_gamertags);
router.patch('/gamertags', auth.authenticateJwt(), gamertagController.gamertag_create_update_patch);
router.delete('/gamertag/:tag', auth.authenticateJwt(), gamertagController.gamertag_delete_delete);


//Auth routes
router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;