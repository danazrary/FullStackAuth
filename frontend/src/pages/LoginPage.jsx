import { useEffect } from "react";
import Login from "../components/Login";
import { useActionData, redirect, useNavigate } from "react-router-dom";
export default function LoginPage() {
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
      <Login data={data} />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const userData = {
    email,
    password,
  };
 
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();

      if (data.error === true) {
        return data.message;
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
