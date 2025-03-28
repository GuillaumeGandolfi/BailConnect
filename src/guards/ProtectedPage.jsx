"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Le header reste en place via ton layout */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-lg text-blue-deep mb-4">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="bg-blue-deep text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Retour à l'accueil
            </Link>
            <button
              onClick={() => signIn("google")}
              className="bg-orange-coral text-white py-2 px-4 rounded hover:bg-orange-600"
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
