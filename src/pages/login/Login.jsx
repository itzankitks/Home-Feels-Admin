import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: false }));
  };

  const validateFields = () => {
    const errors = {
      username: !credentials.username,
      password: !credentials.password,
    };
    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: "Please fill in all fields" },
      });
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/auth/login", credentials);
      if (response.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not admin." },
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response.data,
      });
      // payload: { message: "Login failed" } || err.response?.data,
      console.log(`error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card-wrapper"
      >
        <div className="login-card">
          <div className="login-content">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="login-header"
            >
              <LogIn className="login-icon" />
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Please sign in to your account</p>
            </motion.div>

            {error?.message && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="login-error"
              >
                {error.message}
              </motion.div>
            )}

            <form onSubmit={handleClick} className="login-form">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="login-label">username Address</label>
                <div className="login-input-wrapper">
                  <Mail className="login-input-icon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className={`login-input ${
                      fieldErrors.username ? "input-error" : ""
                    } ${darkMode ? "input-dark" : "input-light"}`}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="login-label">Password</label>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    className={`login-input ${
                      fieldErrors.password ? "input-error" : ""
                    } ${darkMode ? "input-dark" : "input-light"}`}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="login-remember-forgot"
              >
                <div className="login-remember">
                  <input
                    type="checkbox"
                    id="remember"
                    className="login-checkbox"
                  />
                  <label htmlFor="remember" className="login-checkbox-label">
                    Remember me
                  </label>
                </div>
                <div className="login-forgot">
                  <a href="#">Forgot password?</a>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="login-button"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Sign In"}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="login-footer"
            >
              Don&apos;t have an account?{" "}
              <a href="#" className="login-footer-link">
                Sign up now
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
