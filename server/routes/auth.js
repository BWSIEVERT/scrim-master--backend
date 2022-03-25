const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Login user and generate authorization token.
router.post("/", async (req, res) => {
  try {
    // Handle errors
    const { error } = validate(req.body);
    if (error)
      return res.status.send({
        message: error.details[0].message,
      });

    // Find user containing email from req.body
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({
        message: "Invalid Email or Password.",
      });

    // Compare password from req.body with password from user in collection
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({
        message: "Invalid Email or Password.",
      });

    // Generate authorization token for upon login
    const token = user.generateAuthToken();
    res.status(200).send({
      activisionId: user.activisionId,
      email: user.email,
      data: token,
      message: "Logged in successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

// Fetch user data for dashboard.
router.post("/fetchUser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({
        message: `Could NOT find user with the email: ${req.body.email}`,
      });
    res.status(200).send({
      email: user.email,
      activisionId: user.activisionId,
      message: `Data retrieval for ${user.name} successful.`,
    });
  } catch (error) {
    res.status(500).send({
      message: `An internal server error happened while fetching this users data. Error: ${error}`,
    });
  }
});

module.exports = router;
