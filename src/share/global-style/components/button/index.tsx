import styled from "styled-components";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import type { StaticImageData } from "next/image";
import plus from "@/assets/images/plus.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
  src?: StaticImageData;
  bgColor?: string;
  alt?: string;
}

export default function Button({
  icon = false,
  src = plus,
  bgColor = "var(--slate-200)",
  type = "button",
  alt = "",
  children,
  ...props
}: Props) {
  return (
    <SubmitButton type={type} $bgColor={bgColor} {...props}>
      {icon && <Image src={src} alt={alt} />}
      {children}
    </SubmitButton>
  );
}

type SubmitButtonStyleProps = {
  $bgColor: string;
};

const SubmitButton = styled.button<SubmitButtonStyleProps>`
  font-family: "NanumSquare";
  font-size: 16px;
  width: 164.35px;
  height: 52px;
  display: flex;
  gap: 0 5px;
  justify-content: center;
  align-items: center;
  font-weight: 500;

  border: 2px solid var(--slate-900);
  border-radius: 24px;
  background-color: ${({ $bgColor }) => $bgColor};

  box-shadow: 3px 3px 0 1px var(--slate-900);

  &:hover {
    box-shadow:
      3px 3px 0 1px var(--slate-900),
      0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
