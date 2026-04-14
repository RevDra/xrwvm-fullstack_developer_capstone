import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
    }
  };

  return (
    <div className="register_container">
      <div className="header" style={{ marginBottom: "20px" }}>
        <span className="text">Sign Up</span>
      </div>
      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="input">
            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="input">
            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="input">
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input">
            <input type="password" name="psw" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="submit_container">
          <button type="submit" className="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
