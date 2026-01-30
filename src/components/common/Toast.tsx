import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import styled, { keyframes } from 'styled-components';
import type { ToastType } from '../../types/product';

interface ToastData {
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const slideIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`;

const ToastWrapper = styled.div<{ $type: ToastType }>`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: 14px 28px;
  border-radius: 12px;
  font-family: 'pretendard';
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ $type }) =>
    $type === 'error' ? '#e74c3c' : '#2ecc71'};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease forwards;

  &.closing {
    animation: ${slideOut} 0.3s ease forwards;
  }
`;

const TOAST_DURATION = 3000;

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = 'error') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), TOAST_DURATION);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastWrapper $type={toast.type}>{toast.message}</ToastWrapper>}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
