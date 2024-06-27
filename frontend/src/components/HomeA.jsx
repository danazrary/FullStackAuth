import { useEffect, useState } from "react";
import { checkToken, handleAndAutoLogout } from "../utils/refreshToken";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomeA() {
  const navigate = useNavigate();
  const [logedIn, setLogedIn] = useState(
    localStorage.getItem("logedIn") === "true" ? true : false
  );

  const logout = localStorage.getItem("logout");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (logout === "true" || !logout) {
      localStorage.setItem("logout", "true");
      navigate("/");
    }
  }, [logout, navigate]);
  if (logout === "false") {
    useEffect(() => {
      checkToken();
      console.log("check token called in useEffect from HomeA");
    

      if (logedIn) {
      
        setTimeout(() => {
         
          localStorage.setItem("logedIn", "false");
          setLogedIn(false);
        }, 8000);
      }
      if (token) {
        const setIntervalTimer = setInterval(() => {
          const logout = localStorage.getItem("logout");
          if (logout === "true") {
           
            navigate("/");
            return clearInterval(setIntervalTimer);
          }

          checkToken();
        }, 60000);
        return () => {
          clearInterval();
        };
      } else {
      
        checkToken();
      }
    }, [logedIn]);
  }
  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      handleAndAutoLogout();
      navigate("/");
    } else {
      return;
    }
  }

  return (
    <>
      {logedIn && (
        <motion.div
          initial={{ y: 0, x: -200, opacity: 0 }}
          animate={{ y: 40, x: -200, opacity: 1 }}
          exit={{ y: 0, x: -200, opacity: 0 }}
          transition={{ duration: 4, type: "spring", bounce: 0 || 1 || 0 }}
          className="notfication"
        >
          <h1>You are loged in successfully</h1>
        </motion.div>
      )}
      <div className="homeA">
        <h1>HomeA</h1>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </>
  );
}
