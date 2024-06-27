import { Router } from "express";

const router = Router();


router.post("/logout", async (req, res) => {
   res.cookie("auth_token", "", {
     httpOnly: true,
     expires: new Date(0),
   });
   res.cookie("auth_refresh_token", "", {
     httpOnly: true,
     expires: new Date(0),
   });
   res.status(200).json({ logout: true });   
})



export default router