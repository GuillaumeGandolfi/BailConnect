"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Attendre que la session soit chargée
    if (status === "loading") return; // On attend que la session soit chargée
    if (!session) {
      // Si l'user n'est pas connecté on le renvoie vers la page d'accueil
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return children;
}
