"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApproachReceiver() {

  // Demo data (replace with API)
const params = useSearchParams();
const code = params.get("code");

const [data, setData] = useState(null);
const [opened, setOpened] = useState(false);
const [revealImage, setRevealImage] = useState(false);
useEffect(() => {
  if (!code) return;

  fetch(`http://localhost:8080/api/message/${code}`)
    .then(res => res.json())
    .then(apiData => {
  setData({
    sender: apiData.senderName,   // ✅ correct
    receiver: apiData.receiverName,
    message: apiData.messageText,
    image: apiData.image_url,
    video: apiData.video_url,
    audio: apiData.audio_url
  });
})
    .catch(console.error);
}, [code]);
if (!data) {
  return <div style={{padding:40}}>Loading message...</div>;
}
  return (
    <div className="container">
      {/* Floating icons */}
      <div className="float-icon" style={{ top: "12%", left: "10%" }}>💬</div>
      <div className="float-icon" style={{ bottom: "18%", right: "12%" }}>✨</div>
      <div className="float-icon" style={{ top: "30%", right: "25%" }}>😊</div>

      {!opened ? (
        /* Invitation Screen */
        <div className="invite-card" onClick={() => setOpened(true)}>
          <div className="preview">
            <div className="preview-avatar">😊</div>
            <div>
              <div className="preview-name">
                {data.sender || "New Connection"}
              </div>
              <div className="preview-sub">sent you a message</div>
            </div>
          </div>

          <div className="big-emoji">📨</div>

          <h2>You’ve got a new message</h2>
          <p>Someone reached out to start a conversation.</p>

          <div className="tap-hint">Tap to open ✨</div>
        </div>
      ) : (
        /* Chat View */
        <div className="chat-card">
          {/* Header */}
          <div className="chat-header">
            <div className="avatar">😊</div>
            <div>
              <div className="name">
                {data.sender || "New Connection"}
              </div>
              <div className="status">Active now</div>
            </div>
          </div>

          {/* Label */}
          <div className="message-label">First message</div>

          {/* Message Bubble */}
          <div className="bubble">
            {data.message}
          </div>

          {/* Image Reveal */}
          {data.image && (
            <div className="memory-section">
              <div className="memory-label">📷 Photo shared</div>

              <div
                className={`memory-card ${revealImage ? "revealed" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="shared" />

                {!revealImage && (
                  <div className="overlay">
                    Tap to reveal
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="reply-btn">
            Reply & Start Chat 💬
          </button>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1);
          font-family: 'Poppins', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        /* Floating icons */
        .float-icon {
          position: absolute;
          font-size: 36px;
          opacity: 0.15;
          animation: float 10s infinite ease-in-out;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        /* Invite Card */
        .invite-card {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 35px;
          width: 360px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
        }

        .preview {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.15);
          padding: 10px 14px;
          border-radius: 16px;
          margin-bottom: 18px;
        }

        .preview-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(90deg,#ff9a9e,#fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-name {
          font-size: 14px;
          font-weight: 600;
        }

        .preview-sub {
          font-size: 11px;
          opacity: 0.8;
        }

        .big-emoji {
          font-size: 56px;
          margin-bottom: 10px;
        }

        .tap-hint {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.8;
        }

        /* Chat Card */
        .chat-card {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 25px;
          width: 360px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.3);
          animation: fadeIn 0.5s ease;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(90deg,#ff9a9e,#fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .name {
          font-weight: 600;
        }

        .status {
          font-size: 11px;
          opacity: 0.7;
        }

        .message-label {
          font-size: 11px;
          opacity: 0.7;
          margin-bottom: 6px;
        }

        /* Clean chat-style bubble */
        .bubble {
          position: relative;
          background: #ffffff;
          color: #2d2d2d;
          padding: 16px 18px 16px 22px;
          border-radius: 20px 20px 20px 6px;
          font-size: 15px;
          line-height: 1.75;
          font-weight: 500;
          letter-spacing: 0.2px;
          box-shadow: 0 14px 35px rgba(0,0,0,0.12);
          border: 1px solid rgba(0,0,0,0.05);
          animation: bubbleIn 0.5s ease;
        }

        /* Soft brand accent */
        .bubble::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          width: 4px;
          height: 60%;
          border-radius: 10px;
          background: linear-gradient(#ff9a9e, #fad0c4);
        }

        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Image Reveal */
        .memory-section {
          margin-top: 16px;
        }

        .memory-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .memory-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: 0.5s;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .memory-card.revealed {
          height: 220px;
        }

        .memory-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .memory-card.revealed img {
          filter: blur(0);
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.3);
          font-size: 12px;
        }

        .reply-btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border-radius: 20px;
          border: none;
          background: linear-gradient(90deg,#ff9a9e,#fad0c4);
          color: #333;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .reply-btn:hover {
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}