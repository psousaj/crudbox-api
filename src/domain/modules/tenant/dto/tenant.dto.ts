import { z } from 'zod';

export const createTenantSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }),
});

export type CreateTenantDto = z.infer<typeof createTenantSchema>;
export type UpdateTenantDto = Partial<CreateTenantDto>;
