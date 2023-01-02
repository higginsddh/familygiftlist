import { router } from "../trpc";
import { authRouter } from "./auth";
import { familyMemberRouter } from "./familyMember";

export const appRouter = router({
  familyMember: familyMemberRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
