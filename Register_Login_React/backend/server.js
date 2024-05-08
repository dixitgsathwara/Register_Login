const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/User');
const cors=require('cors')
const app = express();
const Swal =require('sweetalert2');
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors())
app.use(bodyParser.json());
app.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const newUser = new User({ name, email, password });
    console.log(newUser)
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.timeLog(error.message)
    console.error('Error:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
});
app.post('/login',async (req,res)=>{
  try {
    const { email , password } = req.body;
    const user = await User.findOne({ email });
    if(user && password===user.password){
      res.status(200).json({ message: 'User Login successfully' });
    }
    else{
      throw new Error('Email or Password incorrect');
    }
  } catch (error) {
    console.timeLog(error.message)
    console.error('Error:', error);
    return res.status(500).json({ message: 'Failed to Login' });
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
