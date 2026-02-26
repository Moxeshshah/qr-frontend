"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    // If QR opened like: localhost:3000/?code=APR_xxxx
    if (code) {
      router.push(`/scan?code=${code}`);
      return;
    }

    // Otherwise open Admin login
    router.push("/admin/login");
  }, []);

  return (
    <div style={{ padding: 40 }}>
      Redirecting...
    </div>
  );
}