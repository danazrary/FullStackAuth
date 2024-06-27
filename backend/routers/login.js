import { Router } from "express";

import { loginValidator } from "../validator/login.js";
import { validationResult, checkSchema } from "express-validator";

import { comparePassword } from "../utils/helper.js";
import { User } from "../database/mongoose/user.js";


import { Token, RefreshToken } from "../middleware/Jwt+Cookie.js";

const router = Router();
router.post("/login", checkSchema(loginValidator), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();

    res.status(422).json({
    //  token: "null",
     // refreshtoken: "null",
      message: error,
      error: true,
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(422).json({
      //  token: "null",
       // refreshtoken: "null",
        message: "user not found",
        error: true,
      });
    }
    const isPasswordMatch = comparePassword(password, findUser.password);

    if (!isPasswordMatch) {
      return res.status(422).json({
      //  token: "null",
       // refreshtoken: "null",
        message: "password is incorrect",
        error: true,
      });
    }
     const token = Token(findUser._id, res);
     const refreshToken = RefreshToken(findUser._id, res);

    
    return res.status(201).json({
      token: token,
     // refreshtoken: "byee",
     // message: "user logged in successfully",
      succsess: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      //token: "null",
     // refreshtoken: "null",
      message: "we could not create user",
      error: true,
    });
  }
});
export default router;
