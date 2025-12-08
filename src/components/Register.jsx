
import { useState } from "react";

export default function Register({ isLoggedIn, onRegisterSuccess, goToHome }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  
  

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    email: inputEmail,
    password: inputPass
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Registration success:", data);
    
    // Set logged in state and redirect after successful registration with email
    if (onRegisterSuccess) {
      onRegisterSuccess(inputEmail || "user@example.com");
    }
    if (goToHome) {
      goToHome();
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

  // Show different content when already logged in
  if (isLoggedIn) {
    return (
      <div
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
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "white" }}>
          Already Logged In
        </h2>
        <p style={{ color: "#aaa", marginBottom: "20px" }}>
          You are already logged in. You can access all features of the application.
        </p>
        {goToHome && (
          <button
            onClick={goToHome}
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
            Go to Home
          </button>
        )}
      </div>
    );
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
        Register
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
        Register
      </button>
    </form>
  )
}
