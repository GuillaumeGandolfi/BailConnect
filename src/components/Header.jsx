import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
            textDecoration: "none",
          }}
        >
          Cession Bail
        </Link>
      </div>
      <nav>
        <AuthButtons />
      </nav>
    </header>
  );
}
