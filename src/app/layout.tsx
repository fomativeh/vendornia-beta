"use client";
import "./globals.scss";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreContext, StoreProvider,} from "@/GlobalState/store";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 0
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId="152751184116-8a7f7d83okdkv58c4o9g3a7d26n4hre9.apps.googleusercontent.com">
        <StoreProvider>
          <body className={inter.className}>{children}</body>
        </StoreProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
