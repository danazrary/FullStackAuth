import Login from "../components/Login";
import { useActionData, redirect } from "react-router-dom";
export default function LoginPage() {
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
  console.log(userData);
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const data = await response.json();

      if (data.error === true) {
        return data.message;
      }
    }
    const data = await response.json();

    return redirect("/");
  } catch (error) {
    return "An unexpected error occurred";
  }
}
