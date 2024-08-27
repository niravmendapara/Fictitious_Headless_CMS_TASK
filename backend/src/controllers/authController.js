const authService = require('./../services/auth-service');

const authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) throw new Error('Invalid Parameters');
        const token = await authService.authenticateUser(username, password);
        res.json(token);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error?.message });
    }
};

module.exports = {
    authenticateUser,
};