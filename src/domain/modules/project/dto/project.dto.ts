import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
    tenantId: z.string({ message: "Id do tenant é obrigatório" }).uuid()
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
