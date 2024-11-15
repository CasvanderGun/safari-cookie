"use server";

import { createSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  "use server";

  const username = formData.get("username") as string;
  const token = Math.random().toString(36).slice(2);
  const session = await createSession(username, token);

  redirect("/protected");
}


export default async function LoginPage() {

  const session = await getSession();
  if (session.isAuthenticated) {
    redirect("/protected");
  }

  return (
   <div>
      <form action={login}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <button type="submit">Login</button>

      </form>

   </div>
  );
}