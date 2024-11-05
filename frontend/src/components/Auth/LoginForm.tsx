"use client";

import React, { useState } from "react";
import { useAuth } from '../../AuthProvider';

const LoginForm: React.FC = () => {
const { auth, tokenExp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password
    };
    try {
      // Call login function from AuthContext
      console.log(data)
      await auth(data);
      // Navigate to dashboard or perform other actions after successful login
    } catch (error: any) {
      console.log(error.response)
      if (error.response && error.response.status === 401) {
        if (error.response.data && error.response.data === "Invalid credentials. Please check your username and password.") {
          alert("Invalid credentials. Please check your username and password.")

        }
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  return (
    <>
      <style jsx>{`
        input::placeholder {
          opacity: 0.6; /* Adjust the opacity value as needed */
        }
      `}</style>

      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="login-form">
            <div className="content">
              <h3>
                Log In
              </h3>
              <p>Please Login to your account.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>USERNAME</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="form-group">
                <label>PASSWORD</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {/* <div className="form-bottom d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember-me"
                  />
                  <label className="form-check-label" htmlFor="remember-me">
                    Remember me
                  </label>
                </div>

                <Link href="/forgot-password" className="forgot-password">
                  Forgot your password?
                </Link>
              </div> */}

              <button type="submit" className="default-btn">
                Login
              </button>

              {/* <div className="text">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Create Account</Link>
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
