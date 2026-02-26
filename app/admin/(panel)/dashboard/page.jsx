// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";

// // export default function AdminLayout({ children }) {
// //   const router = useRouter();
// //   const [active, setActive] = useState("");


// //   const logout = () => {
// //     localStorage.removeItem("admin");
// //     router.push("/admin/login");
// //   };

// //   const menu = [
// //     { name: "Dashboard", path: "/admin/dashboard" },
// //     { name: "Categories", path: "/admin/categories" },
// //     { name: "QR Codes", path: "/admin/qrcodes" },
// //     { name: "Messages", path: "/admin/messages" },
// //     { name: "Users", path: "/admin/users" },
// //   ];

// //   return (
// //     <div className="admin-container">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <div className="logo">Scanova Admin</div>

// //         {menu.map((item) => (
// //           <div
// //             key={item.name}
// //             className={`menu-item ${active === item.name ? "active" : ""}`}
// //             onClick={() => {
// //               setActive(item.name);
// //               router.push(item.path);
// //             }}
// //           >
// //             {item.name}
// //           </div>
// //         ))}

// //         <div className="logout" onClick={logout}>
// //           Logout
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="content">{children}</div>

// //       <style jsx>{`
// //         .admin-container {
// //           display: flex;
// //           min-height: 100vh;
// //           background: linear-gradient(135deg,#89f7fe,#66a6ff,#a18cd1);
// //           font-family: 'Poppins', sans-serif;
// //         }

// //         .sidebar {
// //           width: 240px;
// //           background: rgba(255,255,255,0.2);
// //           backdrop-filter: blur(20px);
// //           padding: 25px 20px;
// //           box-shadow: 0 0 40px rgba(0,0,0,0.2);
// //           display: flex;
// //           flex-direction: column;
// //         }

// //         .logo {
// //           font-size: 22px;
// //           font-weight: 700;
// //           color: white;
// //           margin-bottom: 30px;
// //         }

// //         .menu-item {
// //           padding: 12px 15px;
// //           margin-bottom: 10px;
// //           border-radius: 12px;
// //           color: white;
// //           cursor: pointer;
// //           transition: 0.3s;
// //         }

// //         .menu-item:hover {
// //           background: rgba(255,255,255,0.25);
// //         }

// //         .active {
// //           background: rgba(255,255,255,0.35);
// //           font-weight: 600;
// //         }

// //         .logout {
// //           margin-top: auto;
// //           padding: 12px;
// //           border-radius: 12px;
// //           background: rgba(255,0,0,0.3);
// //           color: white;
// //           text-align: center;
// //           cursor: pointer;
// //         }

// //         .content {
// //           flex: 1;
// //           padding: 40px;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardPage() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [qrCategory, setQrCategory] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [generated, setGenerated] = useState([]);

//   // Load categories
//   useEffect(() => {
//     fetch("http://localhost:8080/api/category")
//       .then(res => res.json())
//       .then(data => setCategories(data));
//   }, []);

//   // Create Category
//   const createCategory = async () => {
//     if (!name || !code) return alert("Enter name & code");

//     const res = await fetch("http://localhost:8080/api/category", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ name, code })
//     });

//     const data = await res.json();
//     setCategories([...categories, data]);
//     setName("");
//     setCode("");
//   };

//   // Generate QR
//   const generateQr = async () => {
//     if (!qrCategory) return alert("Select category");

//     const res = await fetch("http://localhost:8080/api/qr/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         categoryCode: qrCategory,
//         quantity
//       })
//     });

//     const data = await res.json();
//     setGenerated(data);
//   };

//   return (
//     <div>
//       <h1 style={{ color: "white" }}>Admin Dashboard</h1>

//       {/* Create Category */}
//       <div className="card">
//         <h3>Create Category</h3>
//         <input
//           placeholder="Category Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//         <input
//           placeholder="Category Code (APR, LOVE)"
//           value={code}
//           onChange={e => setCode(e.target.value.toUpperCase())}
//         />
//         <button onClick={createCategory}>Create</button>
//       </div>

//       {/* Generate QR */}
//       <div className="card">
//         <h3>Generate QR</h3>

//         <select
//           value={qrCategory}
//           onChange={e => setQrCategory(e.target.value)}
//         >
//           <option value="">Select Category</option>
//           {categories.map(c => (
//             <option key={c.id} value={c.code}>
//               {c.name} ({c.code})
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           value={quantity}
//           onChange={e => setQuantity(e.target.value)}
//         />

//         <button onClick={generateQr}>Generate</button>

//         {generated.length > 0 && (
//           <div className="result">
//             <h4>Generated Codes</h4>
//             {generated.map(code => (
//               <div key={code}>{code}</div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Category Table */}
//       <div className="card">
//         <h3>All Categories</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Code</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map(c => (
//               <tr key={c.id}>
//                 <td>{c.id}</td>
//                 <td>{c.name}</td>
//                 <td>{c.code}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .card {
//           background: rgba(255,255,255,0.2);
//           backdrop-filter: blur(20px);
//           padding: 20px;
//           margin-top: 20px;
//           border-radius: 16px;
//           color: white;
//         }

//         input, select {
//           display: block;
//           margin: 10px 0;
//           padding: 10px;
//           width: 250px;
//           border-radius: 8px;
//           border: none;
//         }

//         button {
//           padding: 10px 20px;
//           border-radius: 10px;
//           border: none;
//           background: white;
//           cursor: pointer;
//         }

//         table {
//           width: 100%;
//           margin-top: 10px;
//           background: rgba(255,255,255,0.3);
//         }

//         td, th {
//           padding: 8px;
//           text-align: left;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    qrs: 0,
    users: 0,
    messages: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/category").then(r => r.json()),
      fetch("http://localhost:8080/api/qr/all").then(r => r.json()),
      fetch("http://localhost:8080/api/user/all").then(r => r.json()),
      fetch("http://localhost:8080/api/message/all").then(r => r.json()),
    ]).then(([cat, qr, user, msg]) => {
      setStats({
        categories: cat.length,
        qrs: qr.length,
        users: user.length,
        messages: msg.length,
      });
    });
  }, []);

  const Card = ({ title, value }) => (
    <div className="card">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid">
        <Card title="Categories" value={stats.categories} />
        <Card title="QR Codes" value={stats.qrs} />
        <Card title="Users" value={stats.users} />
        <Card title="Messages" value={stats.messages} />
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .card {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          padding: 25px;
          border-radius: 16px;
          text-align: center;
        }

        h3 {
          font-size: 32px;
          margin: 0;
        }

        p {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}