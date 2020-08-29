const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  let header, token;
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      error: {
        message: "Access Denied",
      },
    });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    res.send(400).send({
      message: "Invalid Token",
    });
  }
};
