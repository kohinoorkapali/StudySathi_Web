import "../../css/Register.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema/register.schema"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/studysathi_2.png";

export default function Register() {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      setBackendError("");
      setLoading(true);

      console.log("Register Data:", data);

      setLoading(false);
      reset();
      navigate("/login");
    } catch (err) {
      setBackendError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="RegisterPage">
      <div className="RegisterForm">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Join studySathi</h2>
        <p>Create your account to get started</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
  <label>Full Name:</label>
  <input
    type="text"
    placeholder="Enter your full name"
    {...register("fullname")}
    className="login-input"
    maxLength={25} // prevents typing beyond 25 characters
  />
  {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
</div>

<div className="form-group">
  <label>Username:</label>
  <input
    type="text"
    placeholder="Choose a username"
    {...register("username")}
    className="login-input"
    maxLength={25} // prevents typing beyond 25 characters
  />
  {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
</div>


          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email")} 
              className="login-input" 
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              {...register("password")} 
              className="login-input" 
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              {...register("confirm_password")} 
              className="login-input" 
            />
            {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password.message}</div>}
          </div>

          {backendError && (
            <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
              {backendError}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>

          <div className="register-text">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
}