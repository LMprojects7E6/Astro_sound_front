const admin = require("../config/firebaseConfig");
const { auth } = admin;

const validateToken = async (req, res, next) => {
  try {
    //Get the header where token is stored
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //Check if token exist
    if (!authHeader) res.status(401).send("Token not found or invalid");
    //Skip the Bearer and get the token
    const token = authHeader.split(" ")[1];
    //verify token from client
    const tokenVerified = await admin.auth().verifyIdToken(token);
    if (tokenVerified) {
      console.log(tokenVerified);
      req.id = tokenVerified.uid;
      return next();
    }
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
};

module.exports = validateToken;
