import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import logo from "../../assets/studysathi_2.png";
import eyeOpen from "../../assets/eye_open.png";
import eyeClosed from "../../assets/eye_close.png";
import { loginSchema } from "./schema/login.schema";
import { apiRequest } from "../../utils/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const togglePassword = () => setShowPassword(prev => !prev);

  const onSubmit = async (data) => {
    setLoading(true);
    setBackendError("");
    try {
      const res = await apiRequest("POST", "/auth/login", {
        data: { email: data.email, password: data.password },
      });

      if (res.access_token && res.user) {
        // ✅ Store token, role, and user_id
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("user_id", res.user.id);

        // Redirect based on role
        if (res.user.role === "admin") navigate("/admin");
        else navigate("/dashboard");

        reset();
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
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your study resources</p>

        {backendError && <div className="backend-error">{backendError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder="student@email.com"
              className="login-input"
            />
            {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="********"
                className="login-input"
              />
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt="Toggle password"
                className="eye-icon"
                onClick={togglePassword}
              />
            </div>
            {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="divider">
            <span>Don't have an account?</span>
          </div>

          <Link to="/register" className="register-btn">
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
