// Button.tsx
import styled from 'styled-components';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  maxWidth?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width || '150px'};
  max-width: ${({ maxWidth }) => maxWidth || '9999px'};
  height: ${({ height }) => height || '50px'};
  background-color: ${({ bgColor }) => bgColor || 'var(--blue-100)'};
  color: ${({ color }) => color || 'var(--gray-100)'};
  font-family: 'pretendard';
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.1s;

  &:hover {
    background-color: ${({ bgColor }) => bgColor || 'var(--blue-200)'};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

function Button({ ...props }: ButtonProps) {
  return <StyledButton {...props} />;
}

export default Button;
