
const createError = require("http-parser")
// 404 not found 

function notFoundHandaler(req,res,next){
    next(createError(404,"Your requested content was not found"))
}

function errorHandaler(err,req,res,next){
    res.locals.error =process.env.NODE_ENV === "development"?err:{message:err.message}
    res.status(err.status || 500)

    if(res.locals.html){
        res.render("error",{
            title: "Error page"
        })
        
    }else{
        res.json(res.locals.error)
    }
     
}

module.exports={
    notFoundHandaler,
    errorHandaler
}

