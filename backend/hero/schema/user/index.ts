import { object, string } from 'zod';

export const celebritySchema = object({
    name: string(),
});
