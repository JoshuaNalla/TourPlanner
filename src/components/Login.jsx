
import { useState } from "react";

export default function Login({ isLoggedIn, onLoginSuccess, goToRegister, goToHome }) {
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
    
    // Set logged in state and redirect with email
    if (onLoginSuccess) {
      onLoginSuccess(inputEmail || "user@example.com");
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

      {/* ====================================================================
          TEMPORARY BYPASS BUTTON - REMOVE WHEN AUTHENTICATION IS IMPLEMENTED
          ====================================================================
          This button is a temporary workaround to bypass login authentication
          while the security/login algorithm is being developed.
          
          TO REMOVE:
          1. Delete the entire section from the comment above to the comment below
          2. This includes the divider, button, and all associated styling
          3. Once real authentication is working, this bypass should be removed
          ==================================================================== */}
      <div style={{ 
        marginTop: "30px", 
        paddingTop: "20px", 
        borderTop: "1px solid #444",
        textAlign: "center"
      }}>
        <p style={{ color: "#888", fontSize: "12px", marginBottom: "10px" }}>
          Development Only - Bypass Login
        </p>
        <button
          type="button"
          onClick={() => {
            // TEMPORARY: Bypass authentication and set logged in state
            // REMOVE THIS when real authentication is implemented
            if (onLoginSuccess) {
              // Use input email if available, otherwise use default
              onLoginSuccess(inputEmail || "dev@example.com");
            }
            if (goToHome) {
              goToHome();
            }
          }}
          style={{
            padding: "10px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "transform 0.1s ease, background-color 0.1s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff5252")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff6b6b")}
        >
          Bypass Login (Dev Only)
        </button>
      </div>
      {/* ====================================================================
          END OF TEMPORARY BYPASS BUTTON SECTION
          ==================================================================== */}
    </form>
  )
}

