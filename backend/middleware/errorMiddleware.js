const notFound = (req,res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
    next(error);
}

const errorHandler = (err, req, res , next)=>{
    console.log(running);
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.Node_ENV === "production"?null : err.stack,
    });

    
};

module.exports = {notFound, errorHandler};
