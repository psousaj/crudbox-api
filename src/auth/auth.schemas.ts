import { z } from 'zod';
import { createUserSchema } from '@/domain/modules/user/dto/user.dto';

// Schema para registro de usuário
export const registerSchema = createUserSchema.extend({ isStaff: z.boolean().default(false).optional() });

// Schema para login de usuário
export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}); 