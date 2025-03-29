"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-8 text-white">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-blue-deep px-4">
        <div className="max-w-2xl text-center">
          {/* Augmente la marge entre le texte et les boutons */}
          <p className="text-4xl text-white font-montserrat mb-8">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <div className="flex flex-row gap-8 justify-center">
            <Link
              href="/"
              className="bg-blue-bright text-white py-4 px-8 rounded hover:bg-blue-600 transition-colors"
            >
              Retour à l'accueil
            </Link>
            <button
              onClick={() => signIn("google")}
              className="bg-orange-coral text-white py-4 px-8 rounded hover:bg-orange-600 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
