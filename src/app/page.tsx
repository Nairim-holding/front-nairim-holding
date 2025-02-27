import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link href={'/login'} className="block underline pointer text-cyan-400">LOGIN</Link>
      <Link href={'/signup'} className="block underline pointer text-cyan-400">CADASTRO</Link>
    </div>
  );
}
