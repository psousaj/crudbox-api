import { z } from 'zod';
import { ParticipationType, UserRole } from "@/common/constants";

export const UserProjectSchema = z.object({
    id: z.string().uuid(),
    participationType: z.nativeEnum(ParticipationType),
    role: z.nativeEnum(UserRole),
    userId: z.string().uuid(),
    projectId: z.string().uuid(),
});

export type UserProjectDTO = z.infer<typeof UserProjectSchema>; 