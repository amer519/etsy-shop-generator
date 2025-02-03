// src/pages/Login.js
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import what you need from your services file
import { auth, googleProvider } from "../services/firebase";

// Import relevant auth functions from Firebase v9
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Traditional email/password sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <br />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <br />
        <button type="submit">Log In</button>
      </form>
      <br />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;