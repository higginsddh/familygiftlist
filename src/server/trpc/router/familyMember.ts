import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const familyMemberRouter = router({
  createFamilyMember: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const familyMemberCount = await ctx.prisma.familyMember.count({
        where: {
          name: {
            equals: input.name,
          },
        },
      });

      if (familyMemberCount === 0) {
        return ctx.prisma.familyMember.create({
          data: {
            name: input.name,
          },
        });
      }
    }),

  getFamilyMembers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.familyMember.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
