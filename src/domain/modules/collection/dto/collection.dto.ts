import { z } from 'zod';

export const CreateCollectionSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
    projectId: z.string({ message: "O ID do projeto associado é obrigatório" }),
});

export const UpdateCollectionSchema = z.object({
    name: z.string().optional(),
});
