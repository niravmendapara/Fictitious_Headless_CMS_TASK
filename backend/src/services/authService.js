const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '233a0ecb34bccfb7228b81894552a3c6';

const user = {
    userName: process.env.USER_NAME || 'nirav',
    password: process.env.PASSWORD || 'nirav',
}

const authenticateUser = (userName, password) => {
    try {
        if(isValidUser(userName, password)) {
            return {token: generateToken(userName)};
        } else {
            throw new Error('Invalid Access')
        }
    } catch (error) {
        console.log("auth error", error);
        throw error;
    }
}

const isValidUser = (userName, password) => {
    return userName === user.userName && password === user.password;
}

const validateAuthToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if(decoded.userName === user.userName) {
            return decoded;
        } else {
            throw new Error('Invalid Access');
        }
        
    } catch (error) {
        console.log("validate token error", error);
        throw error;
    }
    
}

const generateToken = (userName) => {
  
    const payload = { userName }; 
    const options = { expiresIn: '24h' };
  
    const token = jwt.sign(payload, JWT_SECRET_KEY, options);
    return token;
  };



module.exports = {
    authenticateUser,
    isValidUser,
    validateAuthToken,
};