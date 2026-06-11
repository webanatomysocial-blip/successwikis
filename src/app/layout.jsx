import { LenisProvider } from "./providers";
import AppLayoutClient from "./AppLayoutClient";
import "../css/index.css";

export const metadata = {
  title: "SuccessWikis",
  description: "SuccessWikis is a storytelling platform highlighting startup achievements, founder stories, and the business environment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" />
      </head>
      <body>
        <LenisProvider>
          <AppLayoutClient>
            {children}
          </AppLayoutClient>
        </LenisProvider>
      </body>
    </html>
  );
}
