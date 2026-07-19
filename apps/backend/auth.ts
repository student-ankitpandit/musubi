import { betterAuth } from "better-auth/minimal"; // Smaller bundle
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" })
});
