const user = require('../models/user.model');
const post = require('../models/post.model');
const queryString = require('query-string');
const userModel = require('../models/user.model');
const { populate } = require('../models/post.model');

module.exports = {
  //CREATE POST
  createPost: async (req, res) => {
    const { _id } = req.user;
    req.body.author = _id;
    const newPost = new post(req.body);
    try {
      console.log(newPost);
      const savePost = await newPost.save();
      res.status(200).json({ message: 'Tao post thanh cong!', data: savePost });
    } catch (error) {
      console.log(error);
      res.status(409).json({
        success: false,
        message: 'Title khong duoc trung hoac thieu Username!',
      });
    }
  },

  //UPDATE POST
  updatePostById: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    try {
      const Post = await post.findById(id);

      if (Post.author.toString() === _id) {
        try {
          const updatePost = await post.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json({
            success: true,
            message: 'Update post thanh cong!',
            updatePost,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Loi server' });
        }
      } else {
        res.status(401).json('Username khong dung!');
      }
    } catch (error) {
      res.status(500).json('Chi update duoc post cua ban!');
    }
  },

  //DELETE POST
  deletePostById: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    try {
      const Post = await post.findById(id).populate('author');
      console.log(Post);
      if (Post.author._id.toString() === _id) {
        try {
          await Post.delete();
          res.status(200).json({
            success: true,
            message: 'Delete post thanh cong!',
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Loi server' });
        }
      } else {
        res.status(401).json('Username khong dung!');
      }
    } catch (error) {
      res.status(500).json('Chi delete duoc post cua ban!');
    }
  },

  // onLike
  handleLikePost: async (req, res) => {
    const { _id } = req.user;
    const { postId } = req.body;
    // check post liked by _id
    const Post = await post.findById(postId);
    const isLike = Post.like.find((l) => l._id.toString() === _id);
    let count = Post.like.length;
    if (!isLike) {
      await post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $addToSet: {
            like: _id,
          },
        }
      );
      count++;
    } else {
      await post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: {
            like: _id,
          },
        }
      );
      count--;
    }
    res.status(200).json({
      like: !isLike,
      count,
    });
  },
  // check is like this postId
  checkLikePost: async (req, res) => {
    const { postId } = req.query;
    const Post = await post.findById(postId);
    if (req.user) {
      const { _id } = req.user;
      res.status(200).json({
        like: !!Post.like.find((l) => l._id.toString() === _id),
        count: Post.like.length,
      });
    } else {
      res.status(200).json({
        like: false,
        count: Post.like.length,
      });
    }
  },

  //GET POST BY ID
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const Post = await post
        .findById(id, {})
        .populate('author')
        .populate('categories');
      res.status(200).json(Post);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //GET ALL POSTS
  getAllPost: async (req, res) => {
    const username = req.query.user;
    const cateName = req.query.cat; //categories

    try {
      let posts;
      if (username) {
        posts = await post.find({ username }).populate('author');
      } else if (cateName) {
        posts = await post
          .find({
            categories: {
              $in: [cateName],
            },
          })
          .populate('author');
      } else {
        posts = await post.find().populate('author').populate('categories');
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET POSTS BY AUTHOR
  getPostsByAuthor: async (req, res) => {
    console.log('11111');
    const { author } = req.query;
    console.log(req.query);
    console.log(author);
    try {
      const user = await userModel.findOne({ username: author });
      // console.log(user);
      const posts = await post
        .find({ author: user._id })
        .populate('author')
        .populate('categories');
      res.status(200).json({
        posts: posts,
        user: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  _getPosts: async (res, page, perPage, username) => {
    let x;
    
    const _author = await userModel.findOne({
      username: username
    })
    console.log(_author)
    if (_author) {
      x = post.find({
        author: _author,
      });
    } else {
      x = post.find();
    }
    return x
      .populate('author')
      .populate('categories')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((error, posts) => {
        if(_author){
          post.countDocuments({author: _author},(error, length) => {
            console.log(length);
            res.send({ page: page, length,  posts });
          });
        }else{
          post.countDocuments((error, length) => {
            console.log(length);
            res.send({ page: page, length,  posts });
          });
        
        }
        
      });
  },
  // PAGINATION
  getPosts: async (req, res) => {
    //  http://localhost:8080/api/posts/getposts?page=1

    const page = req.query.page || 1; //page hien tai
    const perPage = req.query.perPage; //san pham tren 1 trang
    // const = pages
    // post
    // .find()
    // .populate("author").populate("categories")
    // .skip((perPage * page) - perPage)
    // .limit(perPage)
    // .exec((err, posts) => {
    //   post.countDocuments((err, count) => {
    //       if (err) return next(err);
    //        res.send({page: page, length: count, posts: posts});
    //     });
    //   });
    // console.log(typeof getPosts1);
    const response = await _getPosts(page, perPage, undefined);
    // console.log(response);
  },
};
/*
GET http://localhost:8080/api/posts/getposts
Response: 
{
    "posts": 4,
    "page": 1
}
*/
