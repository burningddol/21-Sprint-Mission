import type { AppProps } from "next/app";
import "@/share/global-style/styles/global.css";
import Navigation from "@/widgets/navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
