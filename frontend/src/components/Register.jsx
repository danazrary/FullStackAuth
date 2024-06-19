import Input from "./Input";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

export default function Register({ data }) {
  const [showPassword, setShowPassword] = useState();
  let passwordType = "password";
  if (showPassword) {
    passwordType = "text";
  }
  if (!showPassword) {
    passwordType = "password";
  }

  function handleClick() {
    setShowPassword((prev) => !prev);
  }

  return (
    <section className="home">
      <Form method="post" className="auth">
        {data && data[0].msg && (
          <ul className="errors__ul">
            {data.map((da, index) => {
              return (
                <li className="error__li" key={index}>
                  {da.msg}
                </li>
              );
            })}
          </ul>
        )}
        {data && !data[0].msg && (
          <ul className="errors__ul">
            <li className="error__li">{data}</li>
          </ul>
        )}
        <Input
          required
          name="fullname"
          title="Your Name"
          type="text"
          placeholder="full name"
        />
        <Input
          required
          name="email"
          title="Your Email"
          type="email"
          placeholder="email"
        />
        <Input
          required
          name="password"
          title="Password"
          placeholder="password"
          type={passwordType}
        />
        <Input
          required
          name="confirmpassword"
          title="Confirm Password"
          placeholder="confirm password"
          type={passwordType}
        />
        <div className="btn__SHOW">
          <button className="showPassword" onClick={handleClick} type="button">
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
        <div>
          <Input name="policy" type="checkbox" inputClass="checkbox" required />
          <span className="policy__accept">
            I accept the terms and conditions
          </span>
        </div>

        <div>
          <button className="btn login__btn" type="submit">
            Rigister
          </button>
        </div>
        {/*  <div>
          <button className="btn login__btn">Login</button>
        </div> */}
        <div className="div__Home">
          <Link className=" btn__Home" to={"/"}>
            {" "}
            &larr;
          </Link>
        </div>
      </Form>
    </section>
  );
}
