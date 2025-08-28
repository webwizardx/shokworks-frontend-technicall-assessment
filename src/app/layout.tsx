import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "What is the Specialty of us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
