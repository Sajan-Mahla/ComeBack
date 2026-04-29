// crested JWT authentication with token verification middleware


const jwt = require('jsonwebtoken');
app.get("/test", (req,res)=> {
    const authHeader = 
    req.headers["authorization"];

    if(!authHeader){
        return res.json({message: "No token"});
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    res.json({
        decoded
    });
});
