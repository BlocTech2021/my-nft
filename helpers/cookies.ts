import cookie from "cookie"
import { User } from "./types";

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function parseUserFromCookies(req: any): User | undefined {
  const userJson = parseCookies(req).user;
  return userJson ? JSON.parse(userJson) : undefined;
}