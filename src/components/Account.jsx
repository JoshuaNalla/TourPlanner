import React from 'react';
import { User, Mail, LogOut } from 'lucide-react';

export default function Account({ userEmail, onLogout, goToHome }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        margin: "100px auto",
        gap: "20px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#1e1e1e",   
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white", fontSize: "24px" }}>
        Account Details
      </h2>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBottom: "20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "15px",
          backgroundColor: "#2b2b2b",
          borderRadius: "8px",
        }}>
          <User size={20} color="#4a90e2" />
          <div>
            <div style={{ color: "#aaa", fontSize: "12px", marginBottom: "4px" }}>Account</div>
            <div style={{ color: "white", fontSize: "16px" }}>User Account</div>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "15px",
          backgroundColor: "#2b2b2b",
          borderRadius: "8px",
        }}>
          <Mail size={20} color="#4a90e2" />
          <div>
            <div style={{ color: "#aaa", fontSize: "12px", marginBottom: "4px" }}>Email</div>
            <div style={{ color: "white", fontSize: "16px" }}>{userEmail || "Not available"}</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (onLogout) {
            onLogout();
          }
          if (goToHome) {
            goToHome();
          }
        }}
        style={{
          padding: "12px",
          backgroundColor: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "transform 0.1s ease, background-color 0.1s ease",
          marginTop: "10px",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff5252")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff6b6b")}
      >
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  );
}


