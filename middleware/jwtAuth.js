const jwt = require("jsonwebtoken");

const jwtAuth = (req,res,next)=>{
    let jwtToken;

    const authHeader = req.headers["authorization"]
    if(authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1]
    }
    if(authHeader === undefined){
        return res.status(401).send({message:"Invalid JWT"})
    }else{
        jwt.verify(jwtToken, 'JOBBY_SECRET', async(error, payload)=>{
            if(error){
                return res.status(401).send({message:"Invalid JWT"})
            }else{
                req.id = payload.id 
                next()
            }
        })
    }

}

module.exports = jwtAuth;