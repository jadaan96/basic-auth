'use strict';
module.exports = (error,req,res, next)=>{
res.status(500).json({
    code:500,
    route:req.originalUrl,
    message:`SERVER ERROR: ${error.message}`,
})
next(error); 
}