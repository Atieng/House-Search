import "./globals.css";

export const metadata = {
  title: "House Search — Find a house in Juja, Kimbo, K-Road, Gate A, B & C",
  description:
    "Browse available houses around JKUAT — Juja, Kimbo, K-Road and Gate A, B & C. Updated by local landlords every week.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
