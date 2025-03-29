import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          {/* Zone principale qui grandit pour occuper l'espace disponible */}
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
