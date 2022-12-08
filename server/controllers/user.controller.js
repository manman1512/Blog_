const user = require('../models/user.model');
const post = require('../models/post.model');
const argon2 = require('argon2');

module.exports = {
  //UPDATE
  update: async (req, res) => {
    const { id } = req.params;
    const {password, displayName} = req.body;
    if(!req.body.password){
      delete req.body.password;
    }
    if (req.body.userId === id) {
      if(password===""){
        const updateUser = await user.findByIdAndUpdate(
          id,
          { 
            // password: hashedPass,
            displayName
          },
          { new: true }
        );
        res.status(200).json({
          success: 'true',
          message: 'Cap nhat thanh cong!',
          updateUser,
        });
      } else{
        try {
          const hashedPass = await argon2.hash(password);
          const updateUser = await user.findByIdAndUpdate(
            id,
            { 
              password: hashedPass,
              displayName
            },
            { new: true }
          );
  
          res.status(200).json({
            success: 'true',
            message: 'Cap nhat thanh cong!',
            updateUser,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Loi Server!' });
        }
      }
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: 'Chi update duoc Tai khoan cua ban!',
        });
    }
  },

  //DELETE
  deleteById: async (req, res) => {
    const { id } = req.params;
    if (req.user._id === id) {
      try {
        const User = await user.findById(id);
        try {
          await post.deleteMany({ username: User.username });
          await user.findByIdAndDelete(id);
          res
            .status(200)
            .json({ success: true, message: 'Xoa Tai khoan thanh cong!', User });
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Loi Server!' });
        }
      } catch (error) {
        console.log();
        res.status(404).json({ success: false, message: 'Khong tim thay id!' });
      }
    } else {
      // console.log(error);
      res
        .status(400)
        .json({ success: false, message: 'Chi xoa duoc Tai khoan cua ban!' });
    }
  },

  //GET USER
  getById: async (req, res) => {
    const {id} = req.params;

    try {
      const User = await user.findById(id);
      const {password, ...others} = User._doc;
      res.status(200).json(others)
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
    
  },
  // GET ME
  getMe: async(req, res) => {
    const {_id} = req.user;
    try{
      const User = await user.findById(_id);
      if(User){
        res.status(200).json({success: true, User})
      } else {
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }
    }catch (error) {
      // console.log(error);
      res.status(500).json(error)
    }
  },
  getImages: async(req,res)=>{
    const {_id} = req.user;
    try{
      const User = await user.findById(_id);
      if(User){
        res.status(200).json({success: true, images: User.images})
      }
      else{
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }

    }catch(error){
      console.log(error);
      res.status(500).json(error)
    }
  },
  addImage: async(req,res)=>{
    const {_id} = req.user;
    const {image} = req.body;
    try{
      const user = await user.findById(_id);
      if(user){
        user.images.push(image);
        await user.save();
        res.status(200).json({success: true, image: image})
      }else{
        res
        .status(404)
        .json({ success: false, message: 'User khong ton tai!' });
      }

    }catch(error){
      res.status(200).json(error)
    }
  }
};
