import { z } from "zod";
import cloudinary from "cloudinary";

import { router, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";

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
    .mutation(async ({ input, ctx }) => {
      const whereClause = {
        id: input.id,
      };

      const originalItem = await ctx.prisma.giftItem.findFirst({
        where: whereClause,
      });

      if (
        originalItem?.imagePath &&
        (input.imagePath === null || input.imagePath === "")
      ) {
        cloudinary.v2.config({
          cloud_name: env.CLOUDINARY_CLOUD_NAME,
          api_key: env.CLOUDINARY_KEY,
          api_secret: env.CLOUDINARY_SECRET,
        });

        await cloudinary.v2.uploader.destroy(originalItem.imagePath);
      }

      return ctx.prisma.giftItem.update({
        where: whereClause,
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
