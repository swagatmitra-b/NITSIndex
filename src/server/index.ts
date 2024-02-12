import { procedure as publicProcedure, router } from "@/server/trpc";
import {
  rawSchema,
  subCategoryInput,
  statsInput,
  studentInput,
  ballotSchema,
  teamSchema,
  feedBackSchema,
  suggestionSchema,
} from "@/lib/zodSchema";
import type { subCategoryType, Item } from "@/lib/utils";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export const appRouter = router({
  signUp: publicProcedure
    .input(rawSchema.omit({ confirm: true }))
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const name = email.split("_")[0];
      const branch = email.split("@")[1].slice(0, 2);
      const hashedPass = await bcrypt.hash(password, 10);
      const scholarId = parseInt(input.scholarId);
      try {
        const user = await prisma.student.create({
          data: {
            name,
            branch,
            scholarId,
            email,
            password: hashedPass,
          },
        });
        return user;
      } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
      }
    }),
  getTime: publicProcedure.query(async () => {
    try {
      const time = await prisma.votingTime.findUnique({
        where: {
          id: 1,
        },
      });
      return time;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }),
  getAll: publicProcedure.query(async () => {
    const categories = await prisma.category.findMany();
    const subCategories = await Promise.all(
      categories.map(async (category) => {
        const subCat = await prisma.subCategory.findMany({
          where: {
            categoryId: category.id,
          },
        });
        return subCat;
      })
    );
    return [categories, subCategories];
  }),
  getCategories: publicProcedure.query(async () => {
    const categories = await prisma.category.findMany();
    return categories;
  }),
  getSubCategories: publicProcedure
    .input(subCategoryInput)
    .query(async ({ input }) => {
      try {
        const category = await prisma.category.findUnique({
          where: {
            name: input.category,
          },
        });
        if (category) {
          const id = category.id;
          const subCategories = await prisma.subCategory.findMany({
            where: {
              categoryId: id,
            },
          });
          const toppers = await Promise.all(
            subCategories.map(async (subCat) => {
              let topper = (await prisma.item.findFirst({
                where: {
                  subCategoryId: subCat.id,
                },
                orderBy: {
                  votes: "desc",
                },
              })) as Item;
              const others = await prisma.item.findMany({
                where: {
                  subCategoryId: subCat.id,
                },
              });
              const totalVotes = others.reduce(
                (acc, item) => (acc += item.votes),
                0
              );
              Object.assign(topper, { count: totalVotes });
              return topper;
            })
          );
          return [subCategories, toppers];
        }
      } catch (error) {}
    }),
  getStats: publicProcedure.input(statsInput).query(async ({ input }) => {
    const items = await prisma.item.findMany({
      where: {
        subCategoryId: input.subCategoryId,
      },
      orderBy: {
        votes: "desc"
      },
      take: 10,
    });
    const topFive = await prisma.item.findMany({
      where: {
        subCategoryId: input.subCategoryId,
      },
      orderBy: {
        votes: "desc",
      },
      take: 5,
    });
    return [items, topFive];
  }),
  getSentence: publicProcedure.input(statsInput).query(async ({ input }) => {
    const sentences = await prisma.sentence.findMany({
      where: {
        subCategoryId: input.subCategoryId,
      },
    });
    return sentences;
  }),
  getStudent: publicProcedure.input(studentInput).query(async ({ input }) => {
    const student = await prisma.student.findUnique({
      where: {
        email: input.email,
      },
      include: {
        votedSubCategories: true,
      },
    });
    return student;
  }),
  getItems: publicProcedure.input(statsInput).query(async ({ input }) => {
    const items = await prisma.item.findMany({
      where: {
        subCategoryId: input.subCategoryId,
      },
    });
    return items;
  }),
  vote: publicProcedure.input(ballotSchema).mutation(async ({ input }) => {
    await prisma.item.update({
      where: {
        subCategoryId: input.subCategoryId,
        id: input.id,
      },
      data: {
        votes: {
          increment: 1,
        },
      },
    });
    const subCategory = (await prisma.subCategory.findUnique({
      where: {
        id: input.subCategoryId,
      },
    })) as subCategoryType;
    try {
      const updatedVoter = await prisma.student.update({
        where: {
          email: input.email,
        },
        include: {
          votedSubCategories: true,
        },
        data: {
          votedSubCategories: { connect: { id: subCategory.id } },
        },
      });
      console.log(updatedVoter);
      return updatedVoter;
    } catch (error) {
      console.log(error);
    }
  }),
  joinTeam: publicProcedure.input(teamSchema).mutation(async ({ input }) => {
    const { name, scholarId, email, reason } = input;
    let actual = parseInt(scholarId);
    await prisma.application.create({
      data: {
        name,
        scholarId: actual,
        email,
        reason,
      },
    });
    return "Application sent!";
  }),
  feedBack: publicProcedure
    .input(feedBackSchema)
    .mutation(async ({ input }) => {
      await prisma.feedback.create({
        data: {
          email: input.email,
          feedBack: input.feedBack,
        },
      });
      return "Feedback sent!";
    }),
  getTeam: publicProcedure.query(async () => {
    const members = await prisma.team.findMany();
    return members;
  }),
  suggest: publicProcedure
    .input(suggestionSchema)
    .mutation(async ({ input }) => {
      await prisma.suggestion.create({
        data: {
          suggestion: input.suggestion,
          subCategory: input.subCategory,
          category: input.category,
          usermail: input.usermail,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
