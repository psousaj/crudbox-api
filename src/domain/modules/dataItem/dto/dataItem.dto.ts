import { z } from 'zod';

export const createDataItemSchema = z.object({
    data: z.string({ message: "Os dados são obrigatórios" }),
    primitive_type: z.string({ message: "O tipo primitivo é obrigatório" }) // Pode ser um enum se necessário
});

export type CreateDataItemDto = z.infer<typeof createDataItemSchema>;
