import React, { useState } from "react";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    letters: false,
    numbers: false,
    specialChars: false,
    miniLength: false,
  });

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
  }
  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setRequirements({
      letters: /[a-zA-Z]/.test(input),
      numbers: /\d/.test(input),
      specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(input),
      miniLength: input.trim().length >= 8,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.loginDataHandler({username, password});
    setUsername("");
    setPassword("");
    alert("Login success! Open Chrome DevTools to view your login result (hashed password and JWT token) at the 'Console'. The access JWT token is also stored in the 'Cookies' section under the 'Application' tab while DevTools remains open during the session.");
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2> <br></br>
      <form style={styles.form} onSubmit={handleLoginSubmit}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input 
          type="text" 
          value={username}
          style={styles.input}
          onChange={handleUsernameChange}
          required 
          autoComplete="usernamee"
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            style={styles.input}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            required
          />
          <div style={styles.requirements} >
            <p style={getRequirementStyle(requirements.letters)}>
              ✔ Contains letters (a-z, A-Z)
            </p>
            <p style={getRequirementStyle(requirements.numbers)}>
              ✔ Contains numbers (0-9)
            </p>
            <p style={getRequirementStyle(requirements.specialChars)}>
              ✔ Contains special characters (!@#$%^&*)
            </p>
            <p style={getRequirementStyle(requirements.miniLength)}>
              ✔ Contains at least 8 characters
            </p>
          </div>
        </div>
        <button type="submit" 
        style={styles.button} 
        disabled={!isPasswordValid(requirements)} 
        >
          Login
        </button>    {/* BUTTON inside FORM must be `<form style={styles.form} onSubmit={handleLoginSubmit}>` */}
      </form>
        {/* <button 
              type="submit" style={styles.button} 
              disabled={!isPasswordValid(requirements)} 
              onClick={handleLoginSubmit}
            > Login </button> */}
    </div>
  );
};

const getRequirementStyle = (isMet) => ({
  color: isMet ? "green" : "red",
  fontWeight: isMet ? "bold" : "normal",
  textAlign: "left",
});

const isPasswordValid = (requirements) =>
  requirements.letters &&
  requirements.numbers &&
  requirements.specialChars &&
  requirements.miniLength;

const styles = {
  container: {
    width: "400px",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  requirements: {
    marginTop: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginPage;
