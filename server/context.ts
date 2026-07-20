import { Request, Response } from "express";
import { getSession } from "./auth";
import { getDb } from "./db";

export async function createContext({ req, res }: { req: Request; res: Response }) {
  const db = await getDb();
  const session = await getSession(req);

  return {
    req,
    res,
    db,
    session,
    isAdmin: !!session?.isAdmin,
    userId: session?.userId as number | undefined,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
