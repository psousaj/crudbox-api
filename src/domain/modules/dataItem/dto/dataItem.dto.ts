import { z } from 'zod';

export const CreateDataItemSchema = z.object({
    data: z.string({ message: "Os dados são obrigatórios" }),
    primitive_type: z.string({ message: "O tipo primitivo é obrigatório" }) // Pode ser um enum se necessário
});

export const UpdateDataItemSchema = z.object({
    data: z.string().optional(),
    primitive_type: z.string().optional(),
});
