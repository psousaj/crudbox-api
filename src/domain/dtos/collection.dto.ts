import { CollectionFieldType } from '@/common/constants';
import { z } from 'zod';

export const createCollectionSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
    projectId: z.string().uuid(),
    fields: z.array(z.object({
        name: z.string().min(1),
        type: z.nativeEnum(CollectionFieldType),
        required: z.boolean().default(false),
        displayOrder: z.number().optional()
    })).optional()
});

export const updateCollectionSchema = createCollectionSchema.partial();

export const updateFieldSchema = z.object({
    name: z.string().min(1).optional(),
    type: z.nativeEnum(CollectionFieldType).optional(),
    required: z.boolean().optional(),
    displayOrder: z.number().optional()
});

export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDTO = z.infer<typeof updateCollectionSchema>;
export type UpdateFieldDTO = z.infer<typeof updateFieldSchema>;