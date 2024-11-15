"use server";

import { sealSession, unsealSession } from "./seal";
import { deleteSessionCookie, getSessionCookie, setSessionCookie } from "./cookie";
import { cache } from "react";



export type SessionData = {
    username: string;
    token: string;
}
  

export const getSession = cache(async () => {

  const sealedSession = await getSessionCookie();

  if (sealedSession) {
    const unsealedSession = await unsealSession(sealedSession);
    const updatedSession = await updateSession(unsealedSession);
    return { isAuthenticated: true, session: updatedSession }
  } else {
    return { isAuthenticated: false, session: null }
  }

})



export async function createSession(username: string, token: string): Promise<SessionData> {
  "use server";
  console.log("createSession");

  const unsealedSession = {
    username,
    token
  }

  const sealedSession = await sealSession(unsealedSession);

  await setSessionCookie(sealedSession);

  return unsealedSession;

}

export async function updateSession(unsealedSession: SessionData): Promise<SessionData> {
  "use server";
  console.log("updateSession");

  // There is a 50% chance the session needs to be updated
  // Error occurs if this is the case
  if (Math.random() > 0.5) {

    const newToken = Math.random().toString(36).slice(2);
    const updatedSession = createSession(unsealedSession.username, newToken);
    
    return updatedSession;
  } else {
    return unsealedSession;
  }
}

  


export async function deleteSession(): Promise<void> {
  "use server";
  console.log("deleteSession");

  await deleteSessionCookie();
}
