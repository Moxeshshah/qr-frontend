// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Anniversary() {
//   const [loveNote, setLoveNote] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);

//   const router = useRouter();
//   const celebrateLove = () => {
//     if (loveNote.trim() === "") {
//       alert("Write something special before celebrating 💖");
//       return;
//     }
//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2500);
//     setLoveNote("");
//     router.push("/anniversary/greet"); // Redirect to greeting page after celebration
//   };

//   const floatingHearts = [
//     { emoji: "💖", left: "15%", delay: "0s" },
//     { emoji: "💕", left: "35%", delay: "3s" },
//     { emoji: "💞", left: "60%", delay: "5s" },
//     { emoji: "💘", left: "80%", delay: "2s" },
//   ];

//   const moments = [
//     "💍 The day we said yes to forever.",
//     "🌍 Our first trip together.",
//     "🏡 Building dreams side by side.",
//   ];

//   const songs = [
//     "Perfect - Ed Sheeran",
//     "All of Me - John Legend",
//     "A Thousand Years - Christina Perri",
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb)",
//         minHeight: "100vh",
//         padding: "25px 20px 40px",
//         color: "white",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Floating Hearts */}
//       {floatingHearts.map((heart, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             fontSize: "18px",
//             opacity: 0.6,
//             left: heart.left,
//             animation: `float 8s infinite ease-in`,
//             animationDelay: heart.delay,
//           }}
//         >
//           {heart.emoji}
//         </div>
//       ))}

//       {/* Header */}
//       <div className="header" style={{ marginTop: "20px", marginBottom: "30px" }}>
//         <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px" }}>
//           Our Special Day 💑
//         </h1>
//         <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9 }}>
//           Another year of love, laughter, and unforgettable memories.
//         </p>
//       </div>

//       {/* Memory Upload */}
//       <div className="memory-upload" style={{ marginBottom: "25px" }}>
//         <label style={{ fontSize: "13px", display: "block", marginBottom: "8px" }}>
//           Upload a Favorite Memory 📸
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: "15px",
//             border: "none",
//             background: "rgba(255,255,255,0.85)",
//           }}
//         />
//       </div>

//       {/* Love Note */}
//       <textarea
//         value={loveNote}
//         onChange={(e) => setLoveNote(e.target.value)}
//         placeholder="Write a heartfelt anniversary message..."
//         style={{
//           width: "100%",
//           height: "130px",
//           padding: "15px",
//           borderRadius: "18px",
//           border: "none",
//           resize: "none",
//           outline: "none",
//           fontSize: "14px",
//           color: "#333",
//         }}
//       />

//       {/* Timeline */}
//       <div className="timeline" style={{ marginTop: "30px" }}>
//         <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>
//           Beautiful Moments Together ✨
//         </h3>
//         {moments.map((moment, idx) => (
//           <div
//             key={idx}
//             className="moment"
//             style={{
//               background: "rgba(255,255,255,0.2)",
//               padding: "15px",
//               borderRadius: "18px",
//               marginBottom: "12px",
//               fontSize: "13px",
//             }}
//           >
//             {moment}
//           </div>
//         ))}
//       </div>

//       {/* Dedication */}
//       <div className="dedication" style={{ marginTop: "25px" }}>
//         <label style={{ fontSize: "13px" }}>Dedicate a Song 🎵</label>
//         <select
//           style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: "15px",
//             border: "none",
//             background: "rgba(255,255,255,0.85)",
//           }}
//         >
//           {songs.map((song, idx) => (
//             <option key={idx}>{song}</option>
//           ))}
//         </select>
//       </div>

//       {/* Celebrate Button */}
//       <button
//         onClick={celebrateLove}
//         style={{
//           width: "100%",
//           marginTop: "30px",
//           padding: "15px",
//           border: "none",
//           borderRadius: "30px",
//           background: "linear-gradient(to right,#ff758c,#ff7eb3)",
//           color: "white",
//           fontWeight: 500,
//           fontSize: "15px",
//           cursor: "pointer",
//           boxShadow: "0 8px 25px rgba(255,118,136,0.4)",
//           transition: "0.3s",
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
//         onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
//       >
//         Celebrate Love 🎊
//       </button>

//       {/* Toast */}
//       {toastVisible && (
//         <div
//           className="toast"
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "white",
//             color: "#ff4d6d",
//             padding: "12px 22px",
//             borderRadius: "30px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           }}
//         >
//           💖 Your anniversary celebration has been saved!
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(100vh) scale(0.6);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-10vh) scale(1.2);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Anniversary() {
  const [loveNote, setLoveNote] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const user_id =
    typeof window !== "undefined"
      ? localStorage.getItem("user_id")
      : null;

  // Redirect if not logged
  useEffect(() => {
    if (!user_id) {
      router.push(`/anniversary/login?code=${code}`);
    }
  }, []);

  // ===== API INTEGRATION =====
  const celebrateLove = async () => {
    if (loveNote.trim() === "") {
      alert("Write something special before celebrating 💖");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          user_id,
          receiver_name: "Partner",
          message_text: loveNote,
            sender_name: localStorage.getItem("sender_name"),
  sender_mobile: localStorage.getItem("sender_mobile")
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save message");
        return;
      }

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/anniversary/greet?code=${code}`);
      }, 2000);

      setLoveNote("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const floatingHearts = [
    { emoji: "💖", left: "15%", delay: "0s" },
    { emoji: "💕", left: "35%", delay: "3s" },
    { emoji: "💞", left: "60%", delay: "5s" },
    { emoji: "💘", left: "80%", delay: "2s" },
  ];

  const moments = [
    "💍 The day we said yes to forever.",
    "🌍 Our first trip together.",
    "🏡 Building dreams side by side.",
  ];

  const songs = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "A Thousand Years - Christina Perri",
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb)",
        minHeight: "100vh",
        padding: "25px 20px 40px",
        color: "white",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Floating Hearts */}
      {floatingHearts.map((heart, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "18px",
            opacity: 0.6,
            left: heart.left,
            animation: `float 8s infinite ease-in`,
            animationDelay: heart.delay,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Header */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px" }}>
          Our Special Day 💑
        </h1>
        <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9 }}>
          Another year of love, laughter, and unforgettable memories.
        </p>
      </div>

      {/* Memory Upload */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ fontSize: "13px", display: "block", marginBottom: "8px" }}>
          Upload a Favorite Memory 📸
        </label>
        <input
          type="file"
          accept="image/*"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "15px",
            border: "none",
            background: "rgba(255,255,255,0.85)",
          }}
        />
      </div>

      {/* Love Note */}
      <textarea
        value={loveNote}
        onChange={(e) => setLoveNote(e.target.value)}
        placeholder="Write a heartfelt anniversary message..."
        style={{
          width: "100%",
          height: "130px",
          padding: "15px",
          borderRadius: "18px",
          border: "none",
          resize: "none",
          outline: "none",
          fontSize: "14px",
          color: "#333",
        }}
      />

      {/* Timeline */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>
          Beautiful Moments Together ✨
        </h3>
        {moments.map((moment, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "15px",
              borderRadius: "18px",
              marginBottom: "12px",
              fontSize: "13px",
            }}
          >
            {moment}
          </div>
        ))}
      </div>

      {/* Dedication */}
      <div style={{ marginTop: "25px" }}>
        <label style={{ fontSize: "13px" }}>Dedicate a Song 🎵</label>
        <select
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "15px",
            border: "none",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          {songs.map((song, idx) => (
            <option key={idx}>{song}</option>
          ))}
        </select>
      </div>

      {/* Celebrate Button */}
      <button
        onClick={celebrateLove}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "15px",
          border: "none",
          borderRadius: "30px",
          background: "linear-gradient(to right,#ff758c,#ff7eb3)",
          color: "white",
          fontWeight: 500,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(255,118,136,0.4)",
        }}
      >
        Celebrate Love 🎊
      </button>

      {/* Toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            color: "#ff4d6d",
            padding: "12px 22px",
            borderRadius: "30px",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          💖 Your anniversary celebration has been saved!
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(0.6); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}