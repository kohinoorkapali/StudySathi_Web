import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import "../../css/Login.css";
import logo from "../../assets/studysathi_2.png";
import eyeOpen from "../../assets/eye_open.png";
import eyeClosed from "../../assets/eye_close.png";
import { loginSchema } from "./schema/login.schema"; // import schema

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    reset();
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="login-input"
              maxLength={50} // prevent typing beyond 50
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password */}
          <div className="form-group password-wrapper">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="login-input"
            />
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="Toggle password"
              className="eye-icon"
              onClick={togglePassword}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="register-text">
            Don’t have an account? <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
