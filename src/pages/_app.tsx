import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/share/global-style/styles/global.css";
import Navigation from "@/widgets/navigation";
import RenderModel from "@/widgets/render-monster";
import styled from "styled-components";
import Router from "next/router";

function PageLoadingOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);
  // 인라인스타일 분리 예정
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: visible ? 0.35 : 0,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    const start = () => setIsRouteLoading(true);
    const end = () => setIsRouteLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {isRouteLoading && <PageLoadingOverlay />}

      <Navigation />
      <CanvasWrapper>
        <RenderModel />
      </CanvasWrapper>

      <Component {...pageProps} />
    </>
  );
}

const CanvasWrapper = styled.div`
  width: 100%;
  height: 101vh;
  position: absolute;
  top: 60px;
  z-index: 1;
`;
