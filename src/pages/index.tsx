import { useEffect } from "react";
import { useRouter } from "next/router";

const KEY = "apiId";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // SSR 방지용(엄밀히는 useEffect는 클라에서만 실행되지만 습관적으로 OK)
    if (typeof window === "undefined") return;

    const apiId = localStorage.getItem(KEY);

    if (apiId) {
      router.replace("/list");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <div style={{ padding: 24 }}>Loading...</div>;
}
