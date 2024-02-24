
import { estatesRouter } from "~/server/api/routers/estates"
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
    estates: estatesRouter,
});

export type AppRouter = typeof appRouter;
