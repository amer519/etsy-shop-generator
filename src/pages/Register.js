// src/pages/Register.js
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 1) Import the named export from your Firebase service
import { auth } from "../services/firebase";

// 2) Import the function from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      
      // 3) Use the v9 function signature:
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <br />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <br />
        <label>Confirm Password</label>
        <input type="password" ref={passwordConfirmRef} required />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Register;