import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const giftItem = z.object({
  name: z.string(),
  notes: z.string(),
  url: z.string().nullable(),
  imagePath: z.string().optional().nullable(),
});

export const giftItemRouter = router({
  addGiftItem: publicProcedure
    .input(
      giftItem.extend({
        familyMemberId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.giftItem.create({
        data: {
          familyMemberId: input.familyMemberId,
          name: input.name,
          notes: input.notes,
          url: input.url,
          imagePath: input.imagePath ?? null,
        },
      });
    }),

  updateGiftItem: publicProcedure
    .input(
      giftItem.partial().extend({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.giftItem.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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
