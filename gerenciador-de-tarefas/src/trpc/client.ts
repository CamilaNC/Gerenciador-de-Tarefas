import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/bd';

export const trpc = createTRPCReact <AppRouter>();