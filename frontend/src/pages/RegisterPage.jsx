import Register from "../components/Register";
import { redirect, useActionData } from "react-router-dom";
export default function RegisterPage() {
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

    return redirect("/");
  } catch (error) {
    return "An unexpected error occurred";
  }
}
