"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FirstStepLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1 → Show OTP field
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    // Demo mode (no real OTP)
    setShowOtp(true);
  };

  // Step 2 → Verify OTP & Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // Save user locally
localStorage.setItem("user_id", data.id);
localStorage.setItem("sender_name", data.name);
localStorage.setItem("sender_mobile", data.mobile);

      router.push(`/approach/home?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="shape one"></div>
      <div className="shape two"></div>

      <div className="card">
        <div className="avatar">😊</div>

        <div className="title">Take Your First Step</div>
        <div className="subtitle">
          Enter your details to send your first message.
        </div>

        {/* Name */}
        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div className="input-group">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* OTP appears after Send OTP */}
        {showOtp && (
          <div className="input-group otp-field">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {/* Button */}
        {!showOtp ? (
          <button className="btn-login" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <button className="btn-login" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Continue"}
          </button>
        )}

        <div className="footer">
          OTP verification is in demo mode
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#89f7fe,#66a6ff,#a18cd1);
          overflow: hidden;
          position: relative;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          animation: float 10s infinite ease-in-out;
        }

        .shape.one {
          width: 120px;
          height: 120px;
          background: #ffffff;
          top: 15%;
          left: 10%;
        }

        .shape.two {
          width: 90px;
          height: 90px;
          background: #ffdee9;
          bottom: 20%;
          right: 15%;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }

        .card {
          width: 420px;
          padding: 45px 40px;
          border-radius: 30px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.25);
          color: #fff;
          text-align: center;
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: linear-gradient(135deg,#ff9a9e,#fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 18px;
          text-align: left;
          animation: fadeDown 0.4s ease;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          margin-top: 6px;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: rgba(255,255,255,0.3);
          color: white;
          outline: none;
        }

        .input-group input::placeholder {
          color: rgba(255,255,255,0.8);
        }

        .btn-login {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 20px;
          background: linear-gradient(90deg,#ff9a9e,#fad0c4);
          color: #333;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          opacity: 0.8;
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
