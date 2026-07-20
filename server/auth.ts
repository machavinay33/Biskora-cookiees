import { SignJWT, jwtVerify } from "jose";
import { Request, Response } from "express";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_for_development_only");
const COOKIE_NAME = "biskora_session";

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(SECRET_KEY);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(res: Response, userId: number, isAdmin: boolean) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ userId, isAdmin, expiresAt });

  res.cookie(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession(res: Response) {
  res.cookie(COOKIE_NAME, "", {
    expires: new Date(0),
    path: "/",
  });
}

export async function getSession(req: Request) {
  const session = req.cookies?.[COOKIE_NAME];
  if (!session) return null;
  return await decrypt(session);
}
