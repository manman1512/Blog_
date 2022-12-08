const express = require('express');
const router = express.Router();

const {
  createPost,
  updatePostById,
  deletePostById,
  getPostById,
  getAllPost,
  getPostsByAuthor,
  getNumberLikeById,
  handleLikePost,
  checkLikePost
} = require('../controllers/post.controller');

router.get('/getAllPost', getAllPost);
router.get('/getPostById/:id', getPostById);
router.post('/', createPost);
router.patch('/updatePostById/:id', updatePostById);
router.delete('/deletePostById/:id', deletePostById);
router.post("/like-post", handleLikePost);
router.get("/like-post", checkLikePost);

router.get("/getPostsByAuthor", getPostsByAuthor);
router.get("/getNumberLikeById/:id", getNumberLikeById)
module.exports = router;
