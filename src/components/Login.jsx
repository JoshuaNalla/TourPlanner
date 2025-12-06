
import { useState } from "react";

export default function Login({ goToRegister }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    email: inputEmail,
    password: inputPass
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login success:", data);

  } catch (error) {
    console.error("Error:", error);
  }
}
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "320px",
        margin: "100px auto",
        gap: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#1e1e1e",   
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        fontFamily: "Arial",
        color: "white",     
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px", color: "white" }}>
        Login
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #555",
            backgroundColor: "#2b2b2b",
            color: "white",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
          placeholder="••••••••"
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #555",
            backgroundColor: "#2b2b2b",
            color: "white",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "transform 0.1s ease, background-color 0.1s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5aa0ff")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
        >
        Login
      </button>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <span style={{ color: "#aaa", fontSize: "14px" }}>
          Don't have an account?{" "}
        </span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (goToRegister) goToRegister();
          }}
          style={{
            color: "#4a90e2",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Register here
        </a>
      </div>
    </form>
  )
}

