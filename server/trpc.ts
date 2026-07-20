import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().transformer(superjson).create();

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAdmin = t.middleware(async (opts) => {
  if (!opts.ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "NOT_ADMIN_ERR_MSG" });
  }
  return opts.next({
    ctx: {
      // infers the `session` as non-nullable
      isAdmin: opts.ctx.isAdmin,
      userId: opts.ctx.userId,
    },
  });
});

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
