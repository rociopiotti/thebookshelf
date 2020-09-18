const express = require("express");
const router = express.Router();

// MIDDLEWARE
const { auth } = require("../middleware/auth");

// MODELS
const { User } = require("../models/user");

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        // Para fronte end
        auth: false,
        // Mensaje para consola
        message: "Auth fails, email not found",
        // Data para usar en la aplicacion
        userData: false,
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          auth: false,
          message: "Wrong password",
          userData: false,
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          auth: true,
          message: "Login success",
          userData: {
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
          }
        });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.json({
    auth: true,
    userData: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
    },
  });
});

router.get("/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ mesage: "Goodbye" });
  });
});

module.exports = router;
