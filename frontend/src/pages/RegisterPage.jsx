import Register from "../components/Register";
import { useEffect } from "react";
import { redirect, useActionData, useNavigate } from "react-router-dom";
export default function RegisterPage() {
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   const logout = localStorage.getItem("logout");

   useEffect(() => {
     if (token && logout === "false") {
      
       navigate("/home");
     }
   }, [token, logout, navigate]);

  const data = useActionData();

  return (
    <main>
      <Register data={data} />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const { fullname, email, password, confirmpassword } =
    Object.fromEntries(formData);
  const policy = formData.get("policy") === "on";

  const userData = {
    fullname,
    email,
    password,
    confirmpassword,
    policy,
  };

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const data = await response.json();
      const status = await response.status;
      

      if (data.error === true) {
        if (status === 422) {
        
          return data.message;
        } else {
          return data.message;
        }
      }
    }
    const data = await response.json();
    if (data.succsess === true) {
      const d = new Date();
      const theTokenTtime = new Date(d);
      theTokenTtime.setMinutes(d.getMinutes() + 8);
      const theRefreshTokenTtime = new Date(d);
      theRefreshTokenTtime.setDate(d.getDate() + 13);

      const tokenTime = {
        min: theTokenTtime.getMinutes(),
        hour: theTokenTtime.getHours(),
        day: theTokenTtime.getDate(),
        month: theTokenTtime.getMonth() + 1,
        year: theTokenTtime.getFullYear(),
      };

      const refreshTokenTime = {
        min: theRefreshTokenTtime.getMinutes(),
        hour: theRefreshTokenTtime.getHours(),
        day: theRefreshTokenTtime.getDate(),
        month: theRefreshTokenTtime.getMonth() + 1,
        year: theRefreshTokenTtime.getFullYear(),
      };

      localStorage.setItem("tokenTime", JSON.stringify(tokenTime));
      localStorage.setItem(
        "refreshTokenTime",
        JSON.stringify(refreshTokenTime)
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("logedIn", data.succsess);
      localStorage.setItem("logout", false);
      return redirect("/home");
    }
   
  } catch (error) {
    return "An unexpected error occurred";
  }
}

