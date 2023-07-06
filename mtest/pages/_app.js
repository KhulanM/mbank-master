import "../styles/globals.css";
import "../styles/style.css";
import { AuthProvider } from "../context/Context";
import Navbar from "../components/Navbar";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />;
      </div>
    </AuthProvider>
  );
}

export default MyApp;
