import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { postgres } from 'postgres';
  
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);