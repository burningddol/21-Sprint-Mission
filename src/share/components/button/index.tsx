import styled from "styled-components";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import type { StaticImageData } from "next/image";
import plusBlack from "@/assets/images/plus-black.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
  src?: StaticImageData;
  bgColor?: string;
  alt?: string;
  color?: string;
}

export default function Button({
  icon = false,
  src = plusBlack,
  bgColor = "var(--slate-200)",
  type = "button",
  alt = "",
  color = "black",
  children,
  ...props
}: Props) {
  return (
    <SubmitButton type={type} $bgColor={bgColor} $color={color} {...props}>
      {icon && <Image src={src} alt={alt} />}
      {children}
    </SubmitButton>
  );
}

type SubmitButtonStyleProps = {
  $bgColor: string;
  $color: string;
};

const SubmitButton = styled.button<SubmitButtonStyleProps>`
  font-family: "NanumSquare";
  font-size: 16px;
  color: ${({ $color }) => $color};
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
    animation: pressPop 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &::after {
    content: "";
    position: absolute;
    left: -39%;
    top: -25px;
    width: 100vw;
    height: 2px;

    background: var(--violet-600);
    border-radius: 2px;

    transform: scaleX(0);
    transform-origin: left;
    transition:
      transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 220ms ease,
      opacity 220ms ease;

    opacity: 0.4;
    filter: blur(0px);
  }

  &::before {
    content: "";
    position: absolute;
    left: -39%;
    top: -25px;
    width: 100vw;
    height: 2px;

    background: var(--violet-600);
    border-radius: 2px;

    transform: scaleX(0);
    transform-origin: left;
    filter: blur(9px);
    opacity: 0;

    transition:
      transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 220ms ease;
  }

  &:hover::after {
    transform: scaleX(1);
    filter: blur(0.2px);
  }

  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.12);
    border-radius: 10px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &::before,
    &::after {
      content: none;
    }
  }
`;
