const express = require('express');
const router = express.Router();
const UserModel = require('../Models/user');
const tradeModel = require('../Models/trade');
const multer = require('multer');
const path = require('path');


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,      
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profileImages', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404).json({ error: 'Please enter all input fields' });
  }
  const ifUserExist=await UserModel.findOne({email:email});
  if(ifUserExist){
    res.status(404).json({ error: 'User already exist' });
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    createdAt: Date.now(),
  });

  res.status(200).json({ message: 'User Register Successfully', user: user })


});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email: email });
    if (!findUser) return res.status(400).json({ error: 'User not found' });

    const token = await UserModel.matchPasswordAndGenerateToken(email, password);
    const userData = await tradeModel.find({ insertedBy: findUser._id });

    return res.json({ user: findUser, trades: userData, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});


router.post('/EditProfile', upload.single('profileImg'), async (req, res) => {
  try {
    const { userId, name, email, amount } = req.body;
    const updateData = { name, email, amount };

    if (req.file && req.file.path) {
      updateData.profileImg = req.file.path || req.file.url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ userData: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.post('/deleteAccount', async (req,res)=>{

  const {email}=req.body;
  const userDelete=await UserModel.deleteOne({email:email});
  if(!userDelete){
    res.json({message:'User not found'});
  }
  else{
    res.json({message:'User successfully deleted'});
  }
})

module.exports = router
