import { z } from 'zod';

export const CreateTenantSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
});

export const UpdateTenantSchema = z.object({
    name: z.string().optional(),
});
