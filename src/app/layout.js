import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'tippy.js/dist/tippy.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expensilo",
  description:
    "Expensilo is a smart personal finance management app that helps you track expenses, manage budgets, and gain insights into your spending habits. Designed with a clean, intuitive interface, Expensilo empowers users to make informed financial decisions and stay in control of their money.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          transition={Bounce}
        />
        {children}
      </body>
    </html>
  );
}
