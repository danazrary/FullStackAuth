import { Router } from "express";
import jwt from "jsonwebtoken";
import { jwtVerfyRefreshToken, Token } from "../middleware/Jwt+Cookie.js";
import { User } from "../database/mongoose/user.js";

const router = Router();

router.post("/refreshtoken", jwtVerfyRefreshToken, async (req, res) => {
  const { user } = req;

  const findUser = await User.findById(user.id);
  if (!findUser) {
    res.cookie("auth_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie("auth_refresh_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(401).json({
      message: "please login",
      logout: true,
    });
  }
 

  const token = Token(findUser._id, res);

  return res.status(200).json({
    token: token,

    error: false,
  });
});

export default router;
