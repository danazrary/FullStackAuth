import jwt from "jsonwebtoken";


export function Token(id,res){ 
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"10m"});
    res.cookie("auth_token", token, {
      httpOnly: true,
    secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 1000 * 60 * 10, //10 minutes
    });

    return token
}
export function RefreshToken(id, res) {
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "14d",
  });
 res.cookie("auth_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24*14, // 2 weeks
  });

  
  return refreshToken;
}

export const jwtVerfyToken = (req, res, next) => {
    const {auth_token} = req.cookies
    if (!auth_token) {
         return res.status(401).json({
           token: "null",
           refreshtoken: "null",
           message: "Please login first",   
           error: true,
         });
    }
    jwt.verify(auth_token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          token: "null",
          refreshtoken: "null",
          message: "Please login first",
          error: true,
        });
      }
      req.user = user;
      next();
    });
}

export const jwtVerfyRefreshToken = (req, res, next) => {

  const { auth_refresh_token } = req.cookies;
  if (!auth_refresh_token) {
     
     res.cookie("auth_token", "", {
       httpOnly: true,
       expires: new Date(0),
     });
  
    return res.status(401).json({
      
      message: "please login first",
      logout: true,
    });
  }
  jwt.verify(
    auth_refresh_token,
    process.env.JWT_SECRET_REFRESH,
    (err, user) => {
      if (err) {
         res.cookie("auth_token", "", {
           httpOnly: true,
           expires: new Date(0),
         });
         res.cookie("auth_refresh_token", "", {
           httpOnly: true,
           expires: new Date(0),
         });
        return res.status(401).json({
         
          message: "Please login first",
          logout: true,
        });
      }
      req.user = user;
      next();
    }
  );
};