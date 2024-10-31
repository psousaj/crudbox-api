import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" })
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
