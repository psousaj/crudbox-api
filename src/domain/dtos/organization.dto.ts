import { z } from 'zod';
import { OrganizationType } from "@/common/constants";

export const OrganizationSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    organizationType: z.nativeEnum(OrganizationType),
    ownerId: z.string().uuid(),
});

export type OrganizationDTO = z.infer<typeof OrganizationSchema>; 