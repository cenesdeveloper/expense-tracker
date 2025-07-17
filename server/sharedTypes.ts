import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be a valid monetary value" }),
  date: z.string(), // Optionally refine for ISO/date format
  // (no userId, createdAt, id – they are omitted)
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;

export type ApiRoutes = {
  me: {
    $get: () => Promise<Response>;
  };
  expenses: {
    $get: () => Promise<Response>;
    $post: (args: { json: CreateExpense }) => Promise<Response>;
    [id: string]: {
      $delete: (args: { param: { id: string } }) => Promise<Response>;
    };
  };
};
