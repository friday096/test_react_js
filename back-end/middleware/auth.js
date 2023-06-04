const { verify } = require('crypto');
const jwt = require('jsonwebtoken');
var secret = 'mySuperSecret'


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
      if (!token) {
    res.send({
      'status': 400,
      message: "something went wrong in token"
    })

  } else {

    jwt.verify(token, secret, (err, decoded) => {
      console.log('token value +++++++++++++=',decoded)
      if (err) {
        res.send({
          'status': 400,
          Message: "auth token verification failed"
        })
      }
      req.userId = decoded.userId;
      next();
    })
  }
};
const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt