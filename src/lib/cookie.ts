"use server";

import { cookies } from "next/headers";

export async function getSessionCookie(): Promise<string | null> {
	"use server";
	console.log('getSessionCookie');

	try {
		const cookieStore = await cookies();
		const cookieObject = cookieStore.get("session");

		return cookieObject?.value ?? null;
	} catch (error) {
		console.error(error);
		return null;
	}
}


export async function setSessionCookie(sealedSession: string): Promise<void> {
	"use server";
	console.log('setSessionCookie');

	try {
		const cookieStore = await cookies();
		cookieStore.set("session", sealedSession, {
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			maxAge: 60 * 60 * 24 * 7,
			path: "/"
		});
	} catch (error) {
		console.error(error);
	}
}



export async function deleteSessionCookie(): Promise<void> {
	"use server";
	console.log('deleteSessionCookie');

	try {
		const cookieStore = await cookies();
		cookieStore.delete("session");
	} catch (error) {
		console.error(error);
	}

}