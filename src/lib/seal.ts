"use server";

import { defaults, seal, unseal, type SealOptions } from "iron-webcrypto";

import { SessionData } from "./session";

let AUTH_SESSION_SECRET: string = "PlaceholderThatNeedsToBe32MinimumCharactersLongAndShouldBeReplacedWithARealSecret";
let AUTH_SESSION_DURATION: number = 60 * 60 * 24 * 7; 


const options: SealOptions = {
  ...defaults,
  ttl: AUTH_SESSION_DURATION * 1000,
};


export async function sealSession(unsealedSession: SessionData): Promise<string> {
  "use server";

  const data = JSON.stringify(unsealedSession);

  const sealedSession = await seal(crypto, data, AUTH_SESSION_SECRET, options);
  
  return sealedSession;
}


export async function unsealSession(sealedSession: string): Promise<SessionData> {
  "use server";

  const data = await unseal(crypto, sealedSession, AUTH_SESSION_SECRET, options) as string;

  const unsealedSession = JSON.parse(data) as SessionData;

  return unsealedSession;

}