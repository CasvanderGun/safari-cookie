"use server";

import { defaults, seal, unseal, type SealOptions } from "iron-webcrypto";

import { sessionOptions } from "./options";
import { SessionData } from "./session";


const options: SealOptions = {
  ...defaults,
  ttl: sessionOptions.duration * 1000,
};


export async function sealSession(unsealedSession: SessionData): Promise<string> {

  const data = JSON.stringify(unsealedSession);

  const sealedSession = await seal(crypto, data, sessionOptions.secret, options);
  
  return sealedSession;
}


export async function unsealSession(sealedSession: string): Promise<SessionData> {

  const data = await unseal(crypto, sealedSession, sessionOptions.secret, options) as string;

  const unsealedSession = JSON.parse(data) as SessionData;

  return unsealedSession;

}