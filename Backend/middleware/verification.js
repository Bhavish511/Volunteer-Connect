const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Bhavishkumar';

const verification = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.payload = data;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with a valid token" });
    }
}

module.exports = verification;
