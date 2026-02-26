// "use client";

// import { useRouter, useParams } from "next/navigation";

// export default function AnniversaryLogin() {
//     const router = useRouter();
//     const params = useParams(); // get category from URL
  
//     const handleLogin = (e) => {
//       e.preventDefault();
  
//       // dynamic redirect
//       router.push(`/anniversary/home`);
//     };
//   return (
//     <div className="body">
//       <div className="heart" style={{ left: "10%", animationDelay: "0s" }}>❤️</div>
//       <div className="heart" style={{ left: "25%", animationDelay: "2s" }}>💖</div>
//       <div className="heart" style={{ left: "50%", animationDelay: "4s" }}>💞</div>
//       <div className="heart" style={{ left: "70%", animationDelay: "1s" }}>💕</div>
//       <div className="heart" style={{ left: "85%", animationDelay: "3s" }}>💘</div>

//       <div className="login-card">
//         <div className="avatar">💑</div>
//         <h2>Happy Anniversary 💖</h2>
//         <div className="subtitle">
//           Celebrate love & create beautiful memories
//         </div>

//         <form>
//           <div className="input-box">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" required />
//           </div>

//           <div className="input-box">
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" required />
//           </div>

//           <button className="login-btn" onClick={handleLogin}>
//             Celebrate & Login 🎊
//           </button>
//         </form>

//         <div className="register">
//           New here? <a href="#">Create Anniversary Account</a>
//         </div>
//       </div>

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400;500&display=swap');

//         .body {
//           height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           background: linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb);
//           overflow:hidden;
//           position:relative;
//           font-family:'Poppins',sans-serif;
//         }

//         .heart {
//           position:absolute;
//           font-size:20px;
//           animation: float 6s infinite ease-in;
//         }

//         @keyframes float {
//           0%{ transform:translateY(100vh) scale(0.5); opacity:0;}
//           50%{ opacity:1;}
//           100%{ transform:translateY(-10vh) scale(1.2); opacity:0;}
//         }

//         .login-card {
//           width:380px;
//           background: rgba(255,255,255,0.15);
//           backdrop-filter: blur(15px);
//           border-radius:20px;
//           padding:40px 30px;
//           text-align:center;
//           box-shadow:0 8px 30px rgba(0,0,0,0.2);
//           border:1px solid rgba(255,255,255,0.3);
//         }

//         .avatar { font-size:60px; margin-bottom:10px; }

//         h2 {
//           font-family:'Playfair Display',serif;
//           font-size:28px;
//           color:#fff;
//           margin-bottom:8px;
//         }

//         .subtitle { color:#fff; font-size:14px; margin-bottom:25px; }

//         .input-box { margin-bottom:18px; text-align:left; }

//         .input-box label {
//           font-size:13px;
//           color:#fff;
//           display:block;
//           margin-bottom:5px;
//         }

//         .input-box input {
//           width:100%;
//           padding:12px;
//           border-radius:12px;
//           border:none;
//           outline:none;
//           background:rgba(255,255,255,0.8);
//         }

//         .login-btn {
//           width:100%;
//           padding:12px;
//           border:none;
//           border-radius:25px;
//           background: linear-gradient(to right,#ff758c,#ff7eb3);
//           color:#fff;
//           cursor:pointer;
//           margin-top:10px;
//         }

//         .register {
//           margin-top:15px;
//           font-size:13px;
//           color:#fff;
//         }

//         .register a { text-decoration:underline; }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AnniversaryLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1 → Send OTP (Demo)
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
        return;
      }

      // Save user
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("sender_name", data.name);
      localStorage.setItem("sender_mobile", data.mobile);

      router.push(`/anniversary/home?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="heart" style={{ left: "10%", animationDelay: "0s" }}>❤️</div>
      <div className="heart" style={{ left: "25%", animationDelay: "2s" }}>💖</div>
      <div className="heart" style={{ left: "50%", animationDelay: "4s" }}>💞</div>
      <div className="heart" style={{ left: "70%", animationDelay: "1s" }}>💕</div>
      <div className="heart" style={{ left: "85%", animationDelay: "3s" }}>💘</div>

      <div className="login-card">
        <div className="avatar">💑</div>
        <h2>Happy Anniversary 💖</h2>
        <div className="subtitle">
          Celebrate love & create beautiful memories
        </div>

        {/* Name */}
        <div className="input-box">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div className="input-box">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* OTP Dropdown */}
        {showOtp && (
          <div className="input-box">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {!showOtp ? (
          <button className="login-btn" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <button className="login-btn" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Celebrate & Login 🎊"}
          </button>
        )}

        <div className="register">
          OTP verification is in demo mode
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400;500&display=swap');

        .body {
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background: linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb);
          overflow:hidden;
          position:relative;
          font-family:'Poppins',sans-serif;
        }

        .heart {
          position:absolute;
          font-size:20px;
          animation: float 6s infinite ease-in;
        }

        @keyframes float {
          0%{ transform:translateY(100vh) scale(0.5); opacity:0;}
          50%{ opacity:1;}
          100%{ transform:translateY(-10vh) scale(1.2); opacity:0;}
        }

        .login-card {
          width:380px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          border-radius:20px;
          padding:40px 30px;
          text-align:center;
          box-shadow:0 8px 30px rgba(0,0,0,0.2);
          border:1px solid rgba(255,255,255,0.3);
        }

        .avatar { font-size:60px; margin-bottom:10px; }

        h2 {
          font-family:'Playfair Display',serif;
          font-size:28px;
          color:#fff;
          margin-bottom:8px;
        }

        .subtitle { color:#fff; font-size:14px; margin-bottom:25px; }

        .input-box { margin-bottom:18px; text-align:left; }

        .input-box label {
          font-size:13px;
          color:#fff;
          display:block;
          margin-bottom:5px;
        }

        .input-box input {
          width:100%;
          padding:12px;
          border-radius:12px;
          border:none;
          outline:none;
          background:rgba(255,255,255,0.8);
        }

        .login-btn {
          width:100%;
          padding:12px;
          border:none;
          border-radius:25px;
          background: linear-gradient(to right,#ff758c,#ff7eb3);
          color:#fff;
          cursor:pointer;
          margin-top:10px;
        }

        .register {
          margin-top:15px;
          font-size:13px;
          color:#fff;
        }

        .register a { text-decoration:underline; }
      `}</style>
    </div>
  );
}