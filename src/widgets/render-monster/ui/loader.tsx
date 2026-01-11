import { Html, useProgress } from "@react-three/drei";
import styled, { keyframes } from "styled-components";

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <BootWindow>
        <Spinner />
        <Title>3D Loading...</Title>
        <Percent>{progress.toFixed(0)}%</Percent>
      </BootWindow>
    </Html>
  );
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const BootWindow = styled.div`
  font-family: "NanumSquare";
  width: 220px;
  padding: 20px 16px;
  background: rgba(245, 243, 255, 0.9); /* 연보라 */
  backdrop-filter: blur(8px);
  border-radius: 14px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(167, 139, 250, 0.4);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(167, 139, 250, 0.2);
  border-top-color: #a78bfa; /* 보라색 */
  animation: ${spin} 0.9s linear infinite;
`;

export const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4c1d95;
  letter-spacing: 0.03em;
`;

export const Percent = styled.div`
  font-family: "NanumSquare";
  font-size: 12px;
  color: #7c3aed;
  font-family: "JetBrains Mono", monospace;
`;
