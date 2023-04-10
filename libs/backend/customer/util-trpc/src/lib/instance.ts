import { initTRPC } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

const trpcServerInstance = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = trpcServerInstance.router;

export const publicProcedure = trpcServerInstance.procedure;
