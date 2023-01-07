const express = require('express');
const router = express.Router();

const {
  createPost,
  updatePostById,
  deletePostById,
  getPostById,
  getAllPost,
  getPostsByAuthor,
  handleLikePost,
  checkLikePost,
  getPosts,
  _getPosts
} = require('../controllers/post.controller');

router.get('/getAllPost', getAllPost);
router.get('/getPostById/:id', getPostById);
router.post('/', createPost);
router.patch('/updatePostById/:id', updatePostById);
router.delete('/deletePostById/:id', deletePostById);
router.post("/like-post", handleLikePost);
router.get("/like-post", checkLikePost);
router.get("/getposts", async (req, res)=>{
  const {page, perPage} = req.query;
  return _getPosts(res, page, perPage);
});
router.get("/getPostsByAuthor", async (req, res)=>{
  const {page, perPage, author} = req.query;
  return _getPosts(res, page, perPage, author);
});
// router.get("/getNumberPost/:id", getNumberPost)
module.exports = router;
