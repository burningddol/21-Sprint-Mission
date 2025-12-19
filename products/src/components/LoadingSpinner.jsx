import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #ccc;
  border-top: 6px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.div`
  position: absolute;
  left: 42%;
  margin-top: 15px;
  font-size: 18px;
  color: #333;
`;

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Overlay>
      <div style={{ textAlign: 'center' }}>
        <Spinner />
        <Message>{message}</Message>
      </div>
    </Overlay>
  );
}
