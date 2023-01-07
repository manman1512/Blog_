const express = require('express');
const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');

const multer = require('multer');
const path = require('path');

const middleware = require('./middleware');
const userModel = require('./models/user.model');

const app = express();
const server = http.createServer(app);

const MONGO_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connect database successfully!');
  } catch (error) {
    console.log(error);
  }
})();
console.log(path.join(__dirname, 'images'));
// console.log(123123123123);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, '/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    // const name = req.body.name.replaceAll(' ', '%20');
    // console.log(name);
    cb(null, req.body.name);
    // req.body = name;
  },
});

const upload = multer({ storage: storage });

app.use('/api/auth', authRouter);
app.use(middleware);
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { _id } = req.user;
    const { name } = req.body;
    const user = await userModel.findById(_id);
    if (user) {
      user.images.push(name);
      await user.save();
      res.status(200).json({ success: true, image: name });
    } else {
      res.status(404).json({ success: false, message: 'User khong ton tai!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post('/api/upload/avatar', upload.single('file'), async (req, res) => {
  try {
    const { _id } = req.user;
    const { name } = req.body;
    const user = await userModel.findById(_id);
    if (user) {
      user.profilePic = name;
      await user.save();
      res.status(200).json({ success: true, image: name });
    } else {
      res.status(404).json({ success: false, message: 'User khong ton tai!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
