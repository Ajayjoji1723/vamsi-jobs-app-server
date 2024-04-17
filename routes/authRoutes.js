const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JobbyUserData = require("../models/jobbyUsers")

const router = express.Router();


router.get("/auth-route", (req,res)=>{
    res.send("this is authentication")
})

//signup api
router.post("/signup", async (req,res)=>{
    try{
        const {name, email, phoneNumber, gender, password} = req.body;
        const isExist = await JobbyUserData.findOne({email:email})
        if(!isExist){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new JobbyUserData({
                name:name,
                email:email,
                phoneNumber:phoneNumber,
                gender:gender,
                password:hashedPassword
            })
            newUser.save();
            return res.status(201).json({message:"User Created Sucessfully"})
    }else{
        return res.status(400).json({message:"User Already Exits"})
    }

    }catch(e){
        console.log(e.message,"signup")
        return res.status(500).json({meesage:"Internal Server Error"})
    }
})

//login api 
router.post("/login", async(req,res)=>{
    try{
       const {email, password} = req.body;
       const isExist = await JobbyUserData.findOne({email:email});
       if(isExist){
        const isPasswordMatched = await bcrypt.compare(password, isExist.password);
        if(isPasswordMatched){
            let payload ={
                id: isExist._id
            }
            let token = jwt.sign(payload, 'JOBBY_SECRET', {expiresIn:'1hr'})
            return res.status(200).json({token:token, message:"Login Success"})
        }else{
            return res.status(400).json({meesage:"Inavlid Password"})
        }
       }else{
        return res.status(404).json({meesage:"User  Not Found"})
       }
    
    

    }catch(e){
        console.log(e.message,"signup")
        return res.status(500).json({meesage:"Internal Server Error"})
    }

})

module.exports  = router;