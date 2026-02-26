// "use client";

// import { useEffect, useState } from "react";

// export default function QrPage() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/qr/all")
//       .then(res => res.json())
//       .then(setList);
//   }, []);

//   return (
//     <div>
//       <h2>QR Codes</h2>

//       <table style={table}>
//         <thead>
//           <tr>
//             <th>Code</th>
//             <th>Status</th>
//             <th>Created</th>
//             <th>Used</th>
//           </tr>
//         </thead>
//         <tbody>
//           {list.map(q => (
//             <tr key={q.id}>
//               <td>{q.code}</td>
//               <td style={{ color: q.status === "used" ? "red" : "green" }}>
//                 {q.status}
//               </td>
//               <td>{q.createdAt}</td>
//               <td>{q.usedAt || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const table = {
//   width: "100%",
//   background: "white"
// };
"use client";

import { useEffect, useState } from "react";

export default function QrPage() {
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/qr/all")
      .then(res => res.json())
      .then(setQrs);
  }, []);

  return (
    <div>
      <h1>QR Codes</h1>

<button
  style={{ marginBottom: 20 }}
  onClick={() =>
    window.open("http://localhost:8080/api/qr/download-all")
  }
>
  Download All (ZIP)
</button>

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Status</th>
      <th>Download</th>
    </tr>
  </thead>
  <tbody>
    {qrs.map(q => (
      <tr key={q.id}>
        <td>{q.code}</td>
        <td>{q.status}</td>
        <td>
          <button
            onClick={() =>
              window.open(
                `http://localhost:8080/api/qr/download/${q.code}`
              )
            }
          >
            Download
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <style jsx>{`
        table {
          width: 100%;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        td, th {
          padding: 10px;
        }
      `}</style>
    </div>
  );
}