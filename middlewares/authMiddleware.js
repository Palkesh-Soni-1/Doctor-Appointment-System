const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) =>{
    try{
        console.log("authMiddleware try");
        console.log('enter to authmiddleware 1')
        console.log(req)
        const token = req.headers["authorization"].split(" ")[1];
        console.log("token", token)
        JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err)
            {
                console.log(err)
                console.log("authMiddleware try err");
                return res.status(200).send(
                    {
                        message:"AUTH Failed",
                        success: false,
                    }
                );
            }
            else{
                console.log("authMiddleware try err else");
                req.body.userId = decode.id;
                console.log("authMiddleware try err else 2")
                next();
            }
        });
    } catch(error)
    {
        console.log("authMiddleware error");
        console.log(error);
        res.status(401).send({
            message: "AUTH failed",
            success: false
        });
    }
};