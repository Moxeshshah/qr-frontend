"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/message/all")
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Message API error:", err));
  }, []);

  return (
    <div>
      <h2>Messages</h2>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>QR ID</th>
            <th style={th}>Sender</th>
            <th style={th}>Receiver</th>
            <th style={th}>Message</th>
            <th style={th}>Created</th>
          </tr>
        </thead>

        <tbody>
          {messages.map(msg => (
            <tr key={msg.id}>
              <td style={td}>{msg.id}</td>
              <td style={td}>{msg.qrCodeId}</td>
              <td style={td}>{msg.senderName || "-"}</td>
              <td style={td}>{msg.receiverName}</td>
              <td style={td}>
                <div style={{ maxWidth: 250 }}>
                  {msg.messageText}
                </div>
              </td>
              <td style={td}>
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {messages.length === 0 && (
        <p style={{ marginTop: 20 }}>No messages found</p>
      )}
    </div>
  );
}

const table = {
  width: "100%",
  background: "white",
  borderCollapse: "collapse",
  marginTop: 20
};

const th = {
  border: "1px solid #ddd",
  padding: 10,
  background: "#f1f5f9",
  textAlign: "left"
};

const td = {
  border: "1px solid #ddd",
  padding: 10,
  fontSize: 14
};