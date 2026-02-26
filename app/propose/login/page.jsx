// "use client";
// import { useRouter, useParams } from "next/navigation";

// export default function ForeverStartLogin() {
//     const router = useRouter();
//     const params = useParams(); // get category from URL
  
//     const handleLogin = (e) => {
//       e.preventDefault();
  
//       // dynamic redirect
//       router.push(`/propose/home`);
//     };
//   return (
//     <div className="body">

//       <div className="heart-bg one">❤️</div>
//       <div className="heart-bg two">💖</div>

//       <div className="card">

//         <div className="avatar">💕</div>

//         <div className="title">Ready to Propose?</div>
//         <div className="subtitle">
//           Log in to plan your special proposal and send a heartfelt message.
//         </div>

//         <div className="input-group">
//           <label>Email Address</label>
//           <input type="email" placeholder="Enter your email" />
//         </div>

//         <div className="input-group">
//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" />
//         </div>

//         <button className="btn-login" onClick={handleLogin}>
//           Log In & Make It Magical 💍
//         </button>

//         <div className="footer">
//           New here? <span>Create Your Love Story</span>
//         </div>

//       </div>

//       <style jsx>{`
//         *{
//           margin:0;
//           padding:0;
//           box-sizing:border-box;
//           font-family:'Poppins',sans-serif;
//         }

//         .body{
//           height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           background:linear-gradient(135deg,#3a0d2e,#7b1e3b,#c72c41);
//           overflow:hidden;
//           position:relative;
//         }

//         .heart-bg{
//           position:absolute;
//           font-size:60px;
//           opacity:0.08;
//           animation:float 12s infinite ease-in-out;
//         }

//         .heart-bg.one{ top:15%; left:10%; }
//         .heart-bg.two{ bottom:20%; right:15%; }

//         @keyframes float{
//           0%{ transform:translateY(0px);}
//           50%{ transform:translateY(-30px);}
//           100%{ transform:translateY(0px);}
//         }

//         .card{
//           width:420px;
//           padding:45px 40px;
//           border-radius:30px;
//           background:rgba(255,255,255,0.15);
//           backdrop-filter:blur(20px);
//           box-shadow:0 30px 80px rgba(0,0,0,0.4);
//           color:#fff;
//           text-align:center;
//           position:relative;
//         }

//         .card::before{
//           content:"💍";
//           position:absolute;
//           font-size:55px;
//           top:-30px;
//           left:-20px;
//         }

//         .card::after{
//           content:"🌹";
//           position:absolute;
//           font-size:50px;
//           bottom:-30px;
//           right:-20px;
//         }

//         .avatar{
//           width:95px;
//           height:95px;
//           border-radius:50%;
//           margin:0 auto 20px;
//           background:linear-gradient(135deg,#ff758c,#ff7eb3);
//           display:flex;
//           align-items:center;
//           justify-content:center;
//           font-size:40px;
//           box-shadow:0 10px 30px rgba(0,0,0,0.4);
//         }

//         .title{
//           font-size:26px;
//           font-weight:700;
//           margin-bottom:8px;
//         }

//         .subtitle{
//           font-size:14px;
//           opacity:0.9;
//           margin-bottom:30px;
//         }

//         .input-group{
//           margin-bottom:18px;
//           text-align:left;
//         }

//         .input-group label{
//           font-size:13px;
//           font-weight:500;
//         }

//         .input-group input{
//           width:100%;
//           margin-top:6px;
//           padding:14px;
//           border-radius:14px;
//           border:none;
//           background:rgba(255,255,255,0.25);
//           color:white;
//           outline:none;
//         }

//         .input-group input::placeholder{
//           color:rgba(255,255,255,0.8);
//         }

//         .btn-login{
//           width:100%;
//           padding:15px;
//           border:none;
//           border-radius:25px;
//           background:linear-gradient(90deg,#ff758c,#ff7eb3);
//           color:white;
//           font-weight:600;
//           cursor:pointer;
//           margin-top:10px;
//           transition:0.3s;
//           box-shadow:0 10px 30px rgba(0,0,0,0.4);
//         }

//         .btn-login:hover{
//           transform:translateY(-3px);
//         }

//         .footer{
//           margin-top:25px;
//           font-size:13px;
//           opacity:0.9;
//         }

//         .footer span{
//           text-decoration:underline;
//           cursor:pointer;
//         }
//       `}</style>

//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ForeverStartLogin() {
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

      router.push(`/propose/home?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">

      <div className="heart-bg one">❤️</div>
      <div className="heart-bg two">💖</div>

      <div className="card">

        <div className="avatar">💕</div>

        <div className="title">Ready to Propose?</div>
        <div className="subtitle">
          Log in to plan your special proposal and send a heartfelt message.
        </div>

        {/* Name (replaces Email) */}
        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Mobile (replaces Password) */}
        <div className="input-group">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* OTP dropdown */}
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

        {/* Button */}
        {!showOtp ? (
          <button className="btn-login" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <button className="btn-login" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Log In & Make It Magical 💍"}
          </button>
        )}

        <div className="footer">
          OTP verification is in demo mode
        </div>

      </div>

      {/* CSS remains EXACTLY same */}
      <style jsx>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        .body{
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#3a0d2e,#7b1e3b,#c72c41);
          overflow:hidden;
          position:relative;
        }

        .heart-bg{
          position:absolute;
          font-size:60px;
          opacity:0.08;
          animation:float 12s infinite ease-in-out;
        }

        .heart-bg.one{ top:15%; left:10%; }
        .heart-bg.two{ bottom:20%; right:15%; }

        @keyframes float{
          0%{ transform:translateY(0px);}
          50%{ transform:translateY(-30px);}
          100%{ transform:translateY(0px);}
        }

        .card{
          width:420px;
          padding:45px 40px;
          border-radius:30px;
          background:rgba(255,255,255,0.15);
          backdrop-filter:blur(20px);
          box-shadow:0 30px 80px rgba(0,0,0,0.4);
          color:#fff;
          text-align:center;
          position:relative;
        }

        .card::before{
          content:"💍";
          position:absolute;
          font-size:55px;
          top:-30px;
          left:-20px;
        }

        .card::after{
          content:"🌹";
          position:absolute;
          font-size:50px;
          bottom:-30px;
          right:-20px;
        }

        .avatar{
          width:95px;
          height:95px;
          border-radius:50%;
          margin:0 auto 20px;
          background:linear-gradient(135deg,#ff758c,#ff7eb3);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:40px;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
        }

        .title{
          font-size:26px;
          font-weight:700;
          margin-bottom:8px;
        }

        .subtitle{
          font-size:14px;
          opacity:0.9;
          margin-bottom:30px;
        }

        .input-group{
          margin-bottom:18px;
          text-align:left;
        }

        .input-group label{
          font-size:13px;
          font-weight:500;
        }

        .input-group input{
          width:100%;
          margin-top:6px;
          padding:14px;
          border-radius:14px;
          border:none;
          background:rgba(255,255,255,0.25);
          color:white;
          outline:none;
        }

        .input-group input::placeholder{
          color:rgba(255,255,255,0.8);
        }

        .btn-login{
          width:100%;
          padding:15px;
          border:none;
          border-radius:25px;
          background:linear-gradient(90deg,#ff758c,#ff7eb3);
          color:white;
          font-weight:600;
          cursor:pointer;
          margin-top:10px;
          transition:0.3s;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
        }

        .btn-login:hover{
          transform:translateY(-3px);
        }

        .footer{
          margin-top:25px;
          font-size:13px;
          opacity:0.9;
        }
      `}</style>
    </div>
  );
}