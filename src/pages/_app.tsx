import "../../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} theme="dark" />
        </AuthProvider>
    );
}
