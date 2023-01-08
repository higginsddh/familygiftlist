import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const giftItemRouter = router({
  addGiftItem: publicProcedure
    .input(
      z.object({
        familyMemberId: z.string(),
        name: z.string(),
        notes: z.string(),
        url: z.string().nullable(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.giftItem.create({
        data: {
          familyMemberId: input.familyMemberId,
          name: input.name,
          notes: input.notes,
          url: input.url,
        },
      });
    }),

  deleteGiftItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.giftItem.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getGiftItems: publicProcedure
    .input(
      z.object({
        familyMemberId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.giftItem.findMany({
        where: {
          familyMemberId: {
            equals: input.familyMemberId,
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return result;
    }),
});
