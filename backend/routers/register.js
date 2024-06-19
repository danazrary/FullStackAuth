import { Router } from "express";
import { registerValidator } from "../validator/register.js";

import { validationResult, checkSchema } from "express-validator";

import { hashPassword } from "../utils/helper.js";
import { User } from "../database/mongoose/user.js";

const router = Router();

router.post("/register", checkSchema(registerValidator), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();

      return res.status(422).json({
        token: "null",
        refreshtoken: "null",
        message: error,
        error: true,
      });
    }

    const { fullname, email, password, confirmpassword, policy } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(422).json({
        token: "null",
        refreshtoken: "null",
        message: "email already exists",
        error: true,
      });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({
        token: "null",
        refreshtoken: "null",
        message: "passwords do not match",
        error: true,
      });
    }
    if (!policy) {
      return res.status(422).json({
        token: "null",
        refreshtoken: "null",
        message: "please accept terms and conditions",
        error: true,
      });
    }
    const hashedPassword = hashPassword(password);
    const userData = {
      fullname,
      email,
      password: hashedPassword,
    };

    const user = new User(userData);
    await user.save();
    return res.status(201).json({
      token: "hi",
      refreshtoken: "byee",
      message: "user created successfully",
      error: false,
    });
  } catch (error) {
    res.status(422).json({
      token: "null",
      refreshtoken: "null",
      message: "we could not create user",
      error: true,
    });
  }
});

export default router;
