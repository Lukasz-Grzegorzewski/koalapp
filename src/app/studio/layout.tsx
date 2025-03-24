import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity.io Studio",
  description: "Sanity.io Studio description",
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
