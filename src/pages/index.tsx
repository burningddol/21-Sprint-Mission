import { useEffect } from "react";
import { useRouter } from "next/router";

const KEY = "apiId";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // SSR 방지용
    if (typeof window === "undefined") return;

    const apiId = localStorage.getItem(KEY);

    if (apiId) {
      router.replace("/list");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <div>로딩</div>;
}
