import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(40),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export default formSchema;

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});
