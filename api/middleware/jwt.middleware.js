import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  //getting token from cookie
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated!");
  //checking if userid in the token matches logged in userid
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) res.status(403).send("Token is not valid");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
