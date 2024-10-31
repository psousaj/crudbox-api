import { z } from 'zod';

export const createCollectionSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
    projectId: z.string({ message: "O ID do projeto associado é obrigatório" }),
});

export type CreateCollectionDto = z.infer<typeof createCollectionSchema>;
