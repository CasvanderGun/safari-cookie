
import { type SerializeOptions } from "cookie";

type CookieOptions = Omit<SerializeOptions, "encode">;


let AUTH_SESSION_SECRET: string = "PlaceholderThatNeedsToBe32CharactersLongAndShouldBeReplacedWithARealSecret";
let AUTH_SESSION_DURATION: number = 60 * 60 * 24 * 7; 


export interface SessionOptions { 
  cookieName: string;
  secret: string;
  duration: number;
  cookieOptions: CookieOptions;
}


export const sessionOptions: SessionOptions = {
  cookieName: "session",
  secret: AUTH_SESSION_SECRET,
  duration: AUTH_SESSION_DURATION,
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  },
};