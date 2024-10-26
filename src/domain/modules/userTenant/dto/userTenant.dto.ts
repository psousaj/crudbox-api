import { z } from 'zod';

export const CreateUserTenantSchema = z.object({
    userId: z.string({ message: "O ID do usuário é obrigatório" }),
    tenantId: z.string({ message: "O ID do inquilino é obrigatório" }),
    role: z.string({ message: "O papel é obrigatório" }), // Pode ser um enum se necessário
});

export const UpdateUserTenantSchema = z.object({
    userId: z.string().optional(),
    tenantId: z.string().optional(),
    role: z.string().optional(),
});
