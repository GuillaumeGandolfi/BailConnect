import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
