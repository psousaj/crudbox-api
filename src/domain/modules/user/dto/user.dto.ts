import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string({ message: "O primeiro nome é obrigatório" }),
    lastName: z.string({ message: "O sobrenome é obrigatório" }),
    email: z.string().email({ message: 'Endereço de Email inválido' }),
    password: z.string({ message: "A senha é obrigatória" }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
