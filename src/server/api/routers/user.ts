import { z } from "zod";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";
import { type User, users } from "../storage";

interface UserData {
  id: string;
  username: string;
}

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .refine(
      (val) => !users.some((user) => user.username === val),
      "Username is already in use"
    ),
  password: z.string().trim().min(3),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export interface JwtPayload {
  userId: string;
}

const signJwt = (userId: string) => jwt.sign({ userId }, env.JWT_SECRET);

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const user: User = {
        id: v4(),
        password: await argon2.hash(input.password),
        username: input.username,
      };

      users.push(user);
      const userData: UserData = {
        id: user.id,
        username: user.username,
      };

      return {
        accessToken: signJwt(user.id),
        user: userData,
      };
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const user = users.find((user) => user.username === input.username);
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, input.password);
    if (!isPasswordValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const userData: UserData = {
      id: user.id,
      username: user.username,
    };

    return {
      accessToken: signJwt(user.id),
      user: userData,
    };
  }),
  me: protectedProcedure.query(({ ctx }) => {
    const user = users.find((user) => user.id === ctx.userId);
    console.log(user);
    return {
      user: user!,
    };
  }),
});
