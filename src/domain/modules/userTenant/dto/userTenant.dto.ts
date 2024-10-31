import { UserRole } from '@/common/constants';
import { z } from 'zod';

export const createUserTenantSchema = z.object({
    userId: z.string({ message: "O ID do usuário é obrigatório" }),
    tenantId: z.string({ message: "O ID do inquilino é obrigatório" }),
    role: z.enum([UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER])
});

export type CreateUserTenantDto = z.infer<typeof createUserTenantSchema>;
