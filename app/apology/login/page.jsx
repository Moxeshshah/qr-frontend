// "use client";
// import { useRouter, useParams } from "next/navigation";

// export default function ApologyLogin() {
//     const router = useRouter();
//     const params = useParams(); // get category from URL
  
//     const handleLogin = (e) => {
//       e.preventDefault();
  
//       // dynamic redirect
//       router.push(`/apology/home`);
//     };
//   return (
//     <div className="body">

//       {/* Decorative Stickers */}
//       <div className="sticker s1">🕊</div>
//       <div className="sticker s2">🌧</div>
//       <div className="sticker s3">✨</div>

//       <div className="login-card">

//         <h2>Let Me Make This Right 💌</h2>

//         <div className="subtitle">
//           Sometimes a sincere “I’m sorry” 🤍 <br/>
//           can begin the journey of healing 🕊 <br/>
//           Sign in to share your heartfelt message.
//         </div>

//         <form>
//           <div className="input-group">
//             <label>Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="login-btn" onClick={handleLogin}>
//             Send My Message ✉️
//           </button>
//         </form>

//         <div className="footer-text">
//           Healing begins with honesty 💭
//         </div>

//       </div>

//       <style jsx>{`
//         *{
//           margin:0;
//           padding:0;
//           box-sizing:border-box;
//           font-family:'Inter',sans-serif;
//         }

//         .body{
//           height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           background:linear-gradient(135deg,#3a1c71,#d76d77,#ffaf7b);
//           overflow:hidden;
//           position:relative;
//           color:#fff;
//         }

//         .sticker{
//           position:absolute;
//           font-size:42px;
//           opacity:0.18;
//           animation: float 10s infinite ease-in-out;
//         }

//         .s1{ top:8%; left:12%; animation-delay:0s; }
//         .s2{ bottom:12%; right:15%; animation-delay:3s; }
//         .s3{ top:18%; right:20%; animation-delay:6s; }

//         @keyframes float{
//           0%{ transform:translateY(0px);}
//           50%{ transform:translateY(-20px);}
//           100%{ transform:translateY(0px);}
//         }

//         .login-card{
//           width:420px;
//           padding:55px 45px;
//           border-radius:22px;
//           background:rgba(255,255,255,0.08);
//           backdrop-filter:blur(20px);
//           border:1px solid rgba(255,255,255,0.15);
//           box-shadow:0 15px 45px rgba(0,0,0,0.35);
//           text-align:center;
//           position:relative;
//           z-index:2;
//         }

//         h2{
//           font-family:'Playfair Display',serif;
//           font-size:32px;
//           margin-bottom:15px;
//         }

//         .subtitle{
//           font-size:15px;
//           color:#f1f1f1;
//           margin-bottom:35px;
//           line-height:1.7;
//           opacity:0.95;
//         }

//         .input-group{
//           margin-bottom:22px;
//           text-align:left;
//         }

//         .input-group label{
//           font-size:13px;
//           color:#eee;
//           display:block;
//           margin-bottom:6px;
//         }

//         .input-group input{
//           width:100%;
//           padding:13px;
//           border-radius:12px;
//           border:none;
//           outline:none;
//           background:rgba(255,255,255,0.9);
//           color:#333;
//           font-size:14px;
//         }

//         .login-btn{
//           width:100%;
//           padding:14px;
//           border:none;
//           border-radius:30px;
//           background:#ffffff;
//           color:#3a1c71;
//           font-weight:600;
//           cursor:pointer;
//           transition:0.3s;
//           margin-top:10px;
//         }

//         .login-btn:hover{
//           background:#ffe5ec;
//           transform:translateY(-3px);
//         }

//         .footer-text{
//           margin-top:25px;
//           font-size:14px;
//           color:#f3f3f3;
//           opacity:0.9;
//         }
//       `}</style>

//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ApologyLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP (UI demo)
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid mobile number");
      return;
    }

    setShowOtp(true);
  };

  // Step 2: Verify OTP and Login
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

      router.push(`/apology/home?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="body">

      {/* Decorative Stickers */}
      <div className="sticker s1">🕊</div>
      <div className="sticker s2">🌧</div>
      <div className="sticker s3">✨</div>

      <div className="login-card">

        <h2>Let Me Make This Right 💌</h2>

        <div className="subtitle">
          Sometimes a sincere “I’m sorry” 🤍 <br/>
          can begin the journey of healing 🕊 <br/>
          Share your heartfelt message.
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

        {/* OTP field appears after Send OTP */}
        {showOtp && (
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {/* Buttons */}
        {!showOtp ? (
          <button className="login-btn" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <button className="login-btn" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Continue"}
          </button>
        )}

        <div className="footer-text">
          OTP verification is demo mode
        </div>

      </div>

      <style jsx>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Inter',sans-serif;
        }

        .body{
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#3a1c71,#d76d77,#ffaf7b);
          overflow:hidden;
          position:relative;
          color:#fff;
        }

        .sticker{
          position:absolute;
          font-size:42px;
          opacity:0.18;
          animation: float 10s infinite ease-in-out;
        }

        .s1{ top:8%; left:12%; }
        .s2{ bottom:12%; right:15%; }
        .s3{ top:18%; right:20%; }

        @keyframes float{
          0%{ transform:translateY(0px);}
          50%{ transform:translateY(-20px);}
          100%{ transform:translateY(0px);}
        }

        .login-card{
          width:420px;
          padding:55px 45px;
          border-radius:22px;
          background:rgba(255,255,255,0.08);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.15);
          box-shadow:0 15px 45px rgba(0,0,0,0.35);
          text-align:center;
        }

        h2{
          font-family:'Playfair Display',serif;
          font-size:32px;
          margin-bottom:15px;
        }

        .subtitle{
          font-size:15px;
          margin-bottom:35px;
          line-height:1.7;
        }

        .input-group{
          margin-bottom:22px;
          text-align:left;
        }

        .input-group label{
          font-size:13px;
          display:block;
          margin-bottom:6px;
        }

        .input-group input{
          width:100%;
          padding:13px;
          border-radius:12px;
          border:none;
          outline:none;
          background:rgba(255,255,255,0.9);
          color:#333;
          font-size:14px;
        }

        .login-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:30px;
          background:#ffffff;
          color:#3a1c71;
          font-weight:600;
          cursor:pointer;
          transition:0.3s;
          margin-top:10px;
        }

        .login-btn:hover{
          background:#ffe5ec;
          transform:translateY(-3px);
        }

        .footer-text{
          margin-top:25px;
          font-size:14px;
          opacity:0.9;
        }
      `}</style>
    </div>
  );
}