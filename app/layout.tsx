import type { Metadata } from "next";
import { Sora, Source_Code_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-next",
  weight: ["300", "400", "600"],
});

const code = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code-next",
  weight: ["400", "600", "700"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk-next",
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Brainwave - AI Workspace for Focused Thinking",
  description: "Organize, Chat, and Scale your ideas with Brainwave AI Assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${code.variable} ${grotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
