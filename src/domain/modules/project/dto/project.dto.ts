import { IsNotEmpty } from 'class-validator';
import { z } from 'zod';

export const CreateProjectSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" })
});

export const UpdateProjectSchema = z.object({
    name: z.string().optional(),
});

export class CreateProjectDto {
    @IsNotEmpty()
    name: string;
}

export class UpdateProjectDto {
    name?: string;
}
