import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 0, 0, 0.15);
  border-top: 3px solid black;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
