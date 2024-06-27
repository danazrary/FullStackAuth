import { Router } from "express";
import { registerValidator } from "../validator/register.js";

import { validationResult, checkSchema } from "express-validator";

import { hashPassword } from "../utils/helper.js";
import { User } from "../database/mongoose/user.js";

import { Token, RefreshToken } from "../middleware/Jwt+Cookie.js";

const router = Router();

router.post("/register", checkSchema(registerValidator), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();

      return res.status(422).json({
   
        message: error,
        error: true,
      });
    }

    const { fullname, email, password, confirmpassword, policy } = req.body;
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(422).json({
     //   token: "null",
      //  refreshtoken: "null",
        message: "email already exists",
        error: true,
      });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({
      //  token: "null",
      //  refreshtoken: "null",
        message: "passwords do not match",
        error: true,
      });
    }
    if (!policy) {
      return res.status(422).json({
       // token: "null",
      //  refreshtoken: "null",
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

    const token = Token(user._id, res);
    const refreshToken = RefreshToken(user._id, res);

    
    return res.status(201).json({
      token: token,
     // refreshtoken: "byee",// we dont need this
     // message: "user created successfully",
     succsess: true,
      error: false,
    });
  } catch (error) {
    res.status(422).json({
    //  token: "null",
    //  refreshtoken: "null",
      message: "we could not create user",
      error: true,
    });
  }
});

export default router;
