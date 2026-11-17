import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/bd';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc', 
    req: req,              
    router: appRouter,     
    createContext: () => ({}), 
  });
export { handler as GET, handler as POST };
