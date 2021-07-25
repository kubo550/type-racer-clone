import Head from "next/head";
import { Router } from "next/dist/client/router";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CssBaseline } from "@material-ui/core";
import { AuthProvider } from "context/Auth";
import { Navbar } from "components";
import { QueryClient, QueryClientProvider } from "react-query";
import nProgress from "nprogress";
import "styles/globals.css";
import "nprogress/nprogress.css";
import { MainThemeProvider } from "styles";
import type { AppProps } from "next/app";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

const client = new QueryClient();

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Typeracer </title>
        <meta name='description' content='typeracer online game' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      </Head>

      <QueryClientProvider client={client}>
        <AuthProvider>
          <MainThemeProvider>
            <CssBaseline />
            <Navbar />
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} />
            </AnimatePresence>
          </MainThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
