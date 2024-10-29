import { IsNotEmpty, IsUUID } from 'class-validator';
import { z } from 'zod';

export const CreateUserSchema = z.object({
    firstName: z.string({ message: "O primeiro nome é obrigatório" }),
    lastName: z.string({ message: "O sobrenome é obrigatório" }),
    email: z.string().email({ message: 'Endereço de Email inválido' }),
    password: z.string({ message: "A senha é obrigatória" }),
});

export class CreateUserTestDTO {
    @IsNotEmpty({ message: "Precisa mandar o nome" })
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export const UpdateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: 'Endereço de Email inválido' }).optional(),
    password: z.string().optional(),
});
