import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    const response = await fetch(
      "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
      {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (data.success) setStep(2);
    else alert("Failed to send OTP");
  };

  const handleVerifyOtp = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
      {
        method: "POST",
        body: JSON.stringify({ name, email, otp }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (data.verified) {
      alert("Registration successful!");
      setStep(1);
      setName("");
      setEmail("");
      setOtp("");
    } else alert("Invalid OTP");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>

      <header className={styles.header}>
        {/* <img src="/logo.png" alt="Logo" className={styles.logo} /> */}
        <h1>Empresario</h1>
      </header>

      <div className={styles.formContainer}>
        <h2>{step === 1 ? "Register" : "Verify OTP"}</h2>
        {step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <button className={styles.glowBtn} onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.input}
            />
            <button className={styles.glowBtn} onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 Your Event Name | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default RegistrationForm;
