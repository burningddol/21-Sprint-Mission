import type { AppProps } from "next/app";
import "@/share/global-style/styles/global.css";
import Navigation from "@/widgets/navigation";
import RenderModel from "@/widgets/render-monster";
import styled from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <CanvasWrapper>
        <RenderModel />
      </CanvasWrapper>

      <Component {...pageProps} />
    </>
  );
}

const CanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 60px;
  z-index: 1;
`;
