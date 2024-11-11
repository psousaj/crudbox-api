import { z } from 'zod';

export const ProjectSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    description: z.string().optional(),
});

export type ProjectDTO = z.infer<typeof ProjectSchema>; 