import type { Metadata } from "next";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SF Bucket List",
  description: "Helping you explore the best of San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  );
}
