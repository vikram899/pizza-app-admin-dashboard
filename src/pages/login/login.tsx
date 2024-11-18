import React from "react";

const LoginPage = () => {
  return (
    <>
      <h1>Sign in</h1>
      <input placeholder="Username"></input>
      <input placeholder="Password"></input>
      <button>Log in</button>
      <label htmlFor="remember-me">Remember me</label>
      <input type="checkbox" id="remember-me"></input>
      <a href="#">Forgot password</a>
    </>
  );
};

export default LoginPage;
