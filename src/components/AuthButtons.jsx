"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Connecté en tant que {session.user.email}</p>
        <button onClick={() => signOut()}>Déconnexion</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")}>Connexion avec Google</button>
  );
}
