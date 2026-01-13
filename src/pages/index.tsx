import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";

const KEY = "apiId";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // SSR 방지용
    if (typeof window === "undefined") return;

    const apiId = localStorage.getItem(KEY);

    if (apiId) {
      router.replace(`/list/${apiId}`);
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Boot3D>
      <Spinner />
    </Boot3D>
  );
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const inOut = keyframes`
  from { opacity: 0.2; }
  to { opacity: 1 }
`;

const Boot3D = styled.div`
  font-family: "NanumSquare";
  width: 250px;
  height: 250px;

  background: rgba(245, 243, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(167, 139, 250, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 50%);
  animation: ${inOut} 0.3s ease;
  z-index: 999999999999999;
`;

const Spinner = styled.div`
  width: 35%;
  height: 35%;
  border-radius: 50%;
  border: 3.5px solid rgba(167, 139, 250, 0.2);
  border-top-color: #a78bfa;
  animation: ${spin} 0.9s linear infinite;
`;
