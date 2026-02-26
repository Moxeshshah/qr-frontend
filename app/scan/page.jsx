"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

useEffect(() => {
  if (!code) return;

  fetch(`http://localhost:8080/api/qr/${code}`)
    .then(res => {
      if (!res.ok) throw new Error("QR API failed");
      return res.json();
    })
    .then(data => {
      const category = data.category.toLowerCase();

      if (data.status === "unused") {
        router.push(`/${category}/login?code=${code}`);
      } else {
        router.push(`/${category}/receiver?code=${code}`);
      }
    })
    .catch(err => {
      console.error(err);
      router.push("/error");
    });
}, [code]);

  return (
    <div style={{ padding: 40 }}>
      Checking QR...
    </div>
  );
}