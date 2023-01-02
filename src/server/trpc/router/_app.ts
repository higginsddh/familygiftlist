import { router } from "../trpc";
import { authRouter } from "./auth";
import { familyMemberRouter } from "./familyMember";
import { giftItemRouter } from "./giftItem";

export const appRouter = router({
  familyMember: familyMemberRouter,
  giftItem: giftItemRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
