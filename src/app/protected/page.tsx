import { deleteSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";


async function logout() {
  "use server";
  await deleteSession();
  redirect("/login");
}

export default async function ProtectedPage() {
  "use server";

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
        <h3>This page is protected. You need to have a valid session cookie to access it.</h3> 
        <p>Logged in as {session.username}</p>

        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
    </div>
  );
}
