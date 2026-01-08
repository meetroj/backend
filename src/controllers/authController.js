const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

exports.signup = async(req , res )=>{
    console.log("req body:",req.body)
    try{
    const{ name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({message: "all fields are required"});
    }

    const userExits= await User.findOne({email});
    if(userExits){
        return res.status(400).json({message: "user already exits"});
    }

    const hashpassword = await bcrypt.hash(password,10);

   const user = await User.create({
  name,
  email,
  password: hashpassword
});

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

res.status(201).json({ token });

}catch(error){
     console.error(error);
    return res.status(500).json({error:"Server error"});
}
};

exports.login =async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message: "All fields are required "});
        }

        const user =await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

       const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error)
  { console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

};