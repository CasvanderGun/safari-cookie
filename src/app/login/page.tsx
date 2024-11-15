"use server";

import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  "use server";

  const username = formData.get("username") as string;
  const token = Math.random().toString(36).slice(2);
  const session = await setSession(username, token);

  redirect("/protected");
}


export default async function LoginPage() {


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