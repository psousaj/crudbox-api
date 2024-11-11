import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    isActive: z.boolean().default(true),
    isStaff: z.boolean().default(false),
});

export type UserDTO = z.infer<typeof UserSchema>; 