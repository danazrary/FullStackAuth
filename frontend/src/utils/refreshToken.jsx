import { json } from "react-router-dom";

export function checkToken() {
  console.log("check token  func working");

  const token = localStorage.getItem("token");

  const d = new Date();
  const refreshTokenTime = localStorage.getItem("refreshTokenTime");
  const refreshTokenExpiry = JSON.parse(refreshTokenTime);
  const tokenTime = localStorage.getItem("tokenTime");
  const tokenExpiry = JSON.parse(tokenTime);

  if (!refreshTokenTime) {
    handleAndAutoLogout();
  } else if (!token || !tokenExpiry) {
    startRefreshingToken();
  } else if (
    d.getFullYear() > refreshTokenExpiry.year ||
    (d.getMonth() + 1 > refreshTokenExpiry.month &&
      d.getFullYear() == refreshTokenExpiry.year) ||
    (d.getDate() > refreshTokenExpiry.day &&
      d.getMonth() + 1 == refreshTokenExpiry.month &&
      d.getFullYear() == refreshTokenExpiry.year) ||
    (d.getHours() > refreshTokenExpiry.hour &&
      d.getDate() == refreshTokenExpiry.day &&
      d.getMonth() + 1 == refreshTokenExpiry.month &&
      d.getFullYear() == refreshTokenExpiry.year) ||
    (d.getMinutes() >= refreshTokenExpiry.min &&
      d.getHours() == refreshTokenExpiry.hour &&
      d.getDate() == refreshTokenExpiry.day &&
      d.getMonth() + 1 == refreshTokenExpiry.month &&
      d.getFullYear() == refreshTokenExpiry.year)
  ) {
    handleAndAutoLogout();
  } else if (
    d.getFullYear() > tokenExpiry.year ||
    (d.getMonth() + 1 > tokenExpiry.month &&
      d.getFullYear() == tokenExpiry.year) ||
    (d.getDate() > tokenExpiry.day &&
      d.getMonth() + 1 == tokenExpiry.month &&
      d.getFullYear() == tokenExpiry.year) ||
    (d.getHours() > tokenExpiry.hour &&
      d.getDate() == tokenExpiry.day &&
      d.getMonth() + 1 == tokenExpiry.month &&
      d.getFullYear() == tokenExpiry.year) ||
    (d.getMinutes() >= tokenExpiry.min &&
      d.getHours() == tokenExpiry.hour &&
      d.getDate() == tokenExpiry.day &&
      d.getMonth() + 1 == tokenExpiry.month &&
      d.getFullYear() == tokenExpiry.year)
  ) {
    startRefreshingToken();
  } else {
    return;
  }
}

export async function handleAndAutoLogout() {
  const response = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
  }

  const data = await response.json();

  if (data.logout) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshTokenTime");
    localStorage.removeItem("tokenTime");
    localStorage.setItem("logout", true);
    console.log("refresh end");
    return;
  }
}

async function startRefreshingToken() {
  const response = await fetch("http://localhost:3000/api/refreshtoken", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const data = await response.json();

  if (data.logout) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshTokenTime");
    localStorage.removeItem("tokenTime");
    localStorage.setItem("logout", true);
    return;
  }

  const d = new Date();
  const theTokenTtime = new Date(d);
  theTokenTtime.setMinutes(d.getMinutes() + 8);

  const tokenTime = {
    min: theTokenTtime.getMinutes(),
    hour: theTokenTtime.getHours(),
    day: theTokenTtime.getDate(),
    month: theTokenTtime.getMonth() + 1,
    year: theTokenTtime.getFullYear(),
  };

  localStorage.setItem("tokenTime", JSON.stringify(tokenTime));

  localStorage.setItem("token", data.token);

  return;
}
