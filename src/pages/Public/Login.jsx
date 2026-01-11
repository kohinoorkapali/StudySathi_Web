import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import logo from "../../assets/studysathi_2.png";
import eyeOpen from "../../assets/eye_open.png";
import eyeClosed from "../../assets/eye_close.png";
import { loginSchema } from "./schema/login.schema";
import { apiRequest } from "../../utils/api.js"; // make sure you have this

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const togglePassword = () => setShowPassword(prev => !prev);

  const onSubmit = async (data) => {
    setLoading(true);
    setBackendError("");
    try {
      // Call backend API
      const res = await apiRequest("POST", "/auth/login", {
        data: {
          email: data.email,
          password: data.password
        }
      });

      // If backend sends access_token, login success
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        // optional: save role if you have one
        if (res.role) localStorage.setItem("role", res.role);

        reset();
        navigate("/dashboard"); // redirect to dashboard after login
      } else {
        setBackendError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setBackendError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
              maxLength={50}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password */}
          <div className="form-group">
  <label>Password</label>
  
  {/* Input + Icon container */}
  <div className="password-wrapper">
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
  </div>

  {/* Error message stays outside the wrapper */}
  <div className="invalid-feedback">
    {errors.password?.message}
  </div>
</div>


          {/* Backend error */}
          {backendError && (
            <div className="backend-error" style={{ color: "red", marginTop: "10px" }}>
              {backendError}
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="register-text">
            Don’t have an account? <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
