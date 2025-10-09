import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="bg-primary">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
