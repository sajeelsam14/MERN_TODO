import User from "../model/user.js";
// Path:         /
// Type:          post
// ACCESS:        Public
// DESC:          To access the ToDo

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Invalid email" });
  }
  if (user.password != password) {
    return res.status(404).json({ message: "Password is not correct" });
  }
  res.status(202).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// Path:         /singup
// Type:          put
// ACCESS:        Public
// DESC:          To create a account

export const singup = async (req, res) => {
  const { name, DateofBirth, email, password, repassword } = req.body;
  if (name && DateofBirth && email) {
    if (password == repassword) {
      const user = new User({
        name,
        DateofBirth,
        email: email.toLowerCase(),
        password,
      });
      const createdUser = await user.save();
      if (createdUser) {
        res.status(201).json({
          message: "User created successfully",
          userID: user._id,
        });
      } else {
        res.status(400).json({ message: "some error in DB" });
      }
    } else {
      return res.status(409).json({ message: "Password did not match" });
    }
  } else {
    return res.status(409).json({ message: "Invalid Form" });
  }
};
