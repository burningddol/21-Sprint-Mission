// Button.tsx
import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import media from '@/utils/media';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  $maxWidth?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  $borderRadius?: string;
  $mobileWidth?: string;
  $mobileHeight?: string;
  $mobileFontSize?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width || '150px'};
  max-width: ${({ $maxWidth }) => $maxWidth || '9999px'};
  height: ${({ height }) => height || '50px'};
  background-color: ${({ bgColor }) => bgColor || 'var(--blue-100)'};
  color: ${({ color }) => color || 'var(--gray-100)'};
  font-family: 'pretendard';
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  border: none;
  border-radius: ${({ $borderRadius }) => $borderRadius || '5px'};
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.1s;

  &:hover {
    background-color: ${({ bgColor }) => bgColor || 'var(--blue-200)'};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--gray-400);
  }

  &:disabled:hover,
  &:disabled:active {
    transform: none;
  }

  ${media.nowMobile`
    width: ${({ $mobileWidth, width }) => $mobileWidth || width};
    height: ${({ $mobileHeight, height }) => $mobileHeight || height};
    font-size: ${({ $mobileFontSize, fontSize }) => $mobileFontSize || fontSize};
  `}
`;

function Button({ ...props }: ButtonProps) {
  return <StyledButton {...props} />;
}

export default Button;
