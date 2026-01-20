import styled, { keyframes, css } from "styled-components";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import type { StaticImageData } from "next/image";
import plusBlack from "@/assets/images/plus-black.svg";

type SubmitButtonStyleProps = {
  $bgColor: string;
  $color: string;
  $size: string;
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
  src?: StaticImageData;
  bgColor?: string;
  alt?: string;
  color?: string;
  size?: string;
}

export default function Button({
  icon = false,
  src = plusBlack,
  bgColor = "var(--slate-200)",
  type = "button",
  alt = "",
  color = "black",
  size = "small",

  children,
  ...props
}: Props) {
  return (
    <SubmitButton
      type={type}
      $bgColor={bgColor}
      $color={color}
      $size={size}
      {...props}
    >
      {icon && <Image src={src} alt={alt} />}
      {children}
    </SubmitButton>
  );
}

const liftPop = keyframes`
  0%   { transform: translateY(0) scale(1); }
  45%  { transform: translateY(-2px) scale(1.01); }
  100% { transform: translateY(-1px) scale(1.005); }
`;

const pressIn = keyframes`
  0%   { transform: translateY(-1px) scale(1.005); }
  60%  { transform: translateY(1px) scale(0.99); }
  100% { transform: translateY(0.5px) scale(0.995); }
`;

const sheenSweep = keyframes`
  0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
  15%  { opacity: 0.35; }
  55%  { opacity: 0.18; }
  100% { transform: translateX(160%) skewX(-18deg); opacity: 0; }
`;

const ripple = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.35; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
`;

const SubmitButton = styled.button<SubmitButtonStyleProps>`
  position: relative;
  overflow: hidden;
  isolation: isolate; /* pseudo 레이어 분리 */

  font-family: "NanumSquare";
  font-size: 16px;
  color: ${({ $color }) => $color};
  width: ${({ $size }) => ($size === "big" ? "100%" : "164.35px")};
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

  transition:
    box-shadow 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 180ms ease;

  /* ───────────────── sheen(광택 스윕) 레이어 ───────────────── */
  &::selection {
    background: transparent;
  }

  /* 광택 스윕 */
  &::after {
    content: "";
    position: absolute;
    inset: -40%;
    z-index: 0;
    pointer-events: none;

    /* 은은한 하이라이트 */
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.55) 45%,
      rgba(255, 255, 255, 0.25) 55%,
      transparent 100%
    );

    transform: translateX(-140%) skewX(-18deg);
    opacity: 0;
  }

  /* 상단 라인 (add=true에서만 점등) */
  &::before {
    content: "";
    position: absolute;
    left: -30%;
    top: -22px;
    width: 160%;
    height: 2px;
    z-index: 1;
    pointer-events: none;

    background: linear-gradient(
      90deg,
      transparent,
      var(--violet-500),
      transparent
    );
    border-radius: 999px;

    transform: scaleX(0);
    transform-origin: left;
    opacity: 0;
  }

  /* glow 라인 (add=true에서만) */
  ._glowline {
    position: absolute;
    left: -30%;
    top: -22px;
    width: 160%;
    height: 2px;
    z-index: 0;
    pointer-events: none;

    background: var(--violet-500);
    border-radius: 999px;
    filter: blur(12px);
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
  }

  /* 눌림 리플 */
  ._ripple {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    aspect-ratio: 1 / 1;
    border-radius: 999px;
    z-index: 0;
    pointer-events: none;

    background: radial-gradient(
      closest-side,
      rgba(0, 0, 0, 0.12),
      transparent 70%
    );
    transform: translate(-50%, -50%) scale(0.2);
    opacity: 0;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  /* ───────────────── hover ───────────────── */
  &:hover:not(:disabled) {
    box-shadow:
      6px 6px 0 1px var(--slate-900),
      0 14px 26px rgba(0, 0, 0, 0.18);
    filter: saturate(1.06);
    animation: ${liftPop} 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  &:hover:not(:disabled)::after {
    animation: ${sheenSweep} 780ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  /* ───────────────── active ───────────────── */
  &:active:not(:disabled) {
    box-shadow:
      2px 2px 0 1px var(--slate-900),
      0 6px 12px rgba(0, 0, 0, 0.22);
    animation: ${pressIn} 160ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  &:active:not(:disabled) ._ripple {
    opacity: 1;
    animation: ${ripple} 420ms ease-out both;
  }

  /* ───────────────── focus ───────────────── */
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 4px rgba(0, 0, 0, 0.12),
      3px 3px 0 1px var(--slate-900);
    border-radius: 10px;
  }

  /* ───────────────── disabled ───────────────── */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: none;
    animation: none;
  }
`;
