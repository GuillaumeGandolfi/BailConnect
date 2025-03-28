"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-blue-deep">
          Connecté en tant que {session.user.email}
        </p>
        <button
          onClick={() => signOut()}
          className="bg-orange-coral text-white font-bold py-2 px-4 rounded"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-bright text-white font-bold py-2 px-4 rounded"
    >
      Connexion avec Google
    </button>
  );
}
