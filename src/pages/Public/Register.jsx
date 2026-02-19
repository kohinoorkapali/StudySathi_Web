import "../../css/Register.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema/register.schema"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/studysathi_2.png";
import { Link } from "react-router-dom";
import { useApi } from "../../Hooks/useApi"; // your custom hook
import eyeOpen from "../../assets/eye_open.png";
import eyeClosed from "../../assets/eye_close.png";


export default function Register() {
  const navigate = useNavigate();
  const { loading, error, callApi } = useApi(); // destructure from hook
  const [backendError, setBackendError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const toggleConfirmPassword = () => {
  setShowConfirmPassword(prev => !prev);
};


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setBackendError("");
      const res = await callApi("POST", "/auth/register", {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (res) {
        reset();
        navigate("/login");
      }
    } catch (err) {
      setBackendError(err.message);
    }
  };

  return (
    <div className="RegisterPage">
      <div className="RegisterForm">
        <img src={logo} alt="Logo" className="register-logo" />
        <p>Create your account to get started</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullname")}
              className="login-input"
              maxLength={25}
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
              maxLength={25}
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
            <div className="password-wrapper">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirm_password")}
                className="login-input"
              />
              <img
                src={showConfirmPassword ? eyeOpen : eyeClosed}
                alt="Toggle confirm password"
                className="eye-icon"
                onClick={toggleConfirmPassword}
              />
            </div>
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password.message}</div>
            )}
          </div>



          {backendError && (
            <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
              {backendError}
            </div>
          )}

          <button type="submit" className="register_page-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>

          <div className="login_route-divider">
            Already have an account?
          </div>

          <Link to="/login" className="login_route-btn">
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
