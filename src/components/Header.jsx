import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function Header() {
  return (
    <header className="bg-grey-light py-4 px-8 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-blue-deep text-2xl font-bold">
        Cession Bail
      </Link>
      <nav>
        <AuthButtons />
      </nav>
    </header>
  );
}
