const jwt = require('jsonwebtoken');


module.exports = ({ context }) => {
    const token = context.headers.authorization ;
    try {
        if (!token) {
            return  'invalid token pass correct ';
        }
            let decodedToken;   
            decodedToken=jwt.verify(token,   "cmdshakeel123")   
            console.log(decodedToken)    
            return decodedToken;
        }
    
    catch (err) {
        return false;
    }
    
};