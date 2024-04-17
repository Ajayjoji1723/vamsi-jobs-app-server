const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const lifeAtCompanySchema = new mongoose.Schema({
  description: String,
  imageUrl: String,
});


const jobSchema = new mongoose.Schema({  
    title: String,
    companyLogoUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String,
});
const Jobs = mongoose.model('Jobs', jobSchema);

const JobDetail  = new mongoose.Schema({
  title: String,
  companyLogoUrl: String,
  companyWebsiteUrl: String,
  rating: Number,
  location: String,
  packagePerAnnum: String,
  jobDescription: String,
  employmentType: String,
  skills: [skillSchema],
  lifeAtCompany: lifeAtCompanySchema,
});




const JobDetails = mongoose.model('JobDetails', JobDetail )

module.exports = {Jobs, JobDetails};