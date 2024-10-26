import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_URL: z.string(),
  SESSION_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export const getENV = () => {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) throw new Error('Invalid environment variables');

  return parsed.data;
};
