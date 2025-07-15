const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.replace("bearer ", "");

        if(!token){
            const response = {
                status: 401,
                message: "acesso negado"

            };
            return res.status(response.status).send(response);
        }

        const decode = jwt.verify(token, JWT_SECRET);

        req.userId = decode.userId;
        req.userEmail = decode.email;
        req.fullname = decode.fullname;

        next();
    } catch {
        const response = {
            status: 500,
            message: "erro no servidor"
        }
        return res.status(response.status).send(response);
    }
    
}


module.exports = auth;