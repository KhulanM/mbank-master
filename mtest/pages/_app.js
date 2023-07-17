import "../styles/globals.css";
import "../styles/style.css";
import { AuthProvider } from "../context/Context";
import Navbar from "../components/Navbar";

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
