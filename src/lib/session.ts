"use server";

import { sealSession, unsealSession } from "./seal";
import { deleteSessionCookie, getSessionCookie, setSessionCookie } from "./cookie";
import { cache } from "react";
import { NextRequest, NextResponse } from "next/server";



export type SessionData = {
    username: string;
    token: string;
}
  

export const getSession = cache(async () => {
  "use server";
  console.log("getSession");

  const sealedSession = await getSessionCookie();

  if (sealedSession) {
    const unsealedSession = await unsealSession(sealedSession);
    return { isAuthenticated: true, username: updatedSession.username }
  } else {
    return { isAuthenticated: false, username: null }
  }
})



export async function setSession(username: string, token: string): Promise<SessionData> {
  "use server";
  console.log("setSession");

  const unsealedSession = {
    username,
    token
  }

  const sealedSession = await sealSession(unsealedSession);

  await setSessionCookie(sealedSession);

  return unsealedSession;

}

export async function updateSessionMiddleware(request: NextRequest) {
  "use server";
  console.log("updateSessionMiddleware");

  const sealedSession = request.cookies.get("session")?.value;

  if (sealedSession) {
    const unsealedSession = await unsealSession(sealedSession);

    if (isTokenExpired(unsealedSession.token)) {
      const newToken = Math.random().toString(36).slice(2);
      const updatedSession = setSession(unsealedSession.username, newToken);
      // Update the session cookie with the new token
      const response = NextResponse.next();
      response.cookies.set("session", await sealSession(updatedSession));
      return response;
    }
  }

  return NextResponse.next();
}

function isTokenExpired(token: string): boolean {
  // Implement your token expiration logic here
  return false; // Placeholder
}


  


export async function deleteSession(): Promise<void> {
  "use server";
  console.log("deleteSession");

  await deleteSessionCookie();
}