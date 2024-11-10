import User from "../model/user.js";

export const authHandler = async (req, res, next) => {
  if (req.headers.userid) {
    try {
      const user_id = req.headers.userid;
      let user = await User.findById(user_id).select("-password");
      res.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized No user found" });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
