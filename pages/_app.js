import NavBar from "../Components/NavBar/NavBar";
import "../styles/globals.css";
import Head from "next/head";
import Footer from "../Components/Footer/Footer";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative">
      <Head>
        <title>Cap-Blog</title>
        <meta name="description" content="This is a Cap Blog" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
