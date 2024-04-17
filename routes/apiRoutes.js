const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuth = require('../middleware/jwtAuth')
const {Jobs, JobDetails} = require("../models/jobs");
const { findOne } = require("../models/jobbyUsers");

const router = express.Router();


router.get("/api-route", (req,res)=>{
    res.send("this is apis")
})

router.get("/jobs", jwtAuth, async(req,res)=>{
    try{
       const {search, employement_type, minimum_package} =req.query 
       
       const query = {}

       if(employement_type){
        const employmentTypesArray = employement_type.split(',')
        query.employmentType = {$in : employmentTypesArray.map(type=> new RegExp(type, 'i'))} 
       }

       if(minimum_package) {
        const minPackageValue = parseFloat(minimum_package.replace(/\D+/g, ''));
        if(!isNaN(minPackageValue)) {
            query.packagePerAnnum = {$gte : minPackageValue}
        }

       }
       if(search){
        query.title= {$regex:search, $options:'i'}
       }
       const jobs = await Jobs.find(query)
       if(jobs.length === 0 ) {
        return res.status(404).json({msg:"No Jobs Found"})
       }
       return res.json(jobs)

    }catch(e){
        return res.status(500).json({message:"Internal Server Error"});
    }
    
})


router.get("/job/:jobId", jwtAuth,async(req,res)=>{
    try{
        const {jobId} = req.params
        const job = await JobDetails.findOne({_id: jobId});
        const jobTitle =  job.title;
        
       

       const similarJobs = await Jobs.find({
        title : {$regex : jobTitle, $options: 'i'},
        _id: {$ne: jobId}
       })
       console.log(similarJobs)

        res.status(200).json({jobDetails:job , similarJobs:similarJobs})

    }catch(e){
        return res.status(500).json({message:"Internal Server Error"});
    }
})


module.exports  = router;