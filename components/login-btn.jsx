import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Não logado - Clique aqui para logar <br />
      <button
        className="rounded-md bg-green-800 text-slate-200"
        onClick={signIn}
      >
        Logar
      </button>
    </>
  );
}
