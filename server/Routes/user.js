const express = require('express');
const router = express.Router();
const UserModel = require('../Models/user');
const tradeModel = require('../Models/trade');
const multer = require('multer');
const path = require('path');

//MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/assets'));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
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
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { userId, name, email, amount } = req.body;
    const updateData = { name, email, amount };

    if (req.file) {
      updateData.profileImg = `/assets/${req.file.filename}`;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ userData: updatedUser });
  } catch (err) {
    console.error("EditProfile error:", err); // <--- log full error
    res.status(500).json({ error: err.message });
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
