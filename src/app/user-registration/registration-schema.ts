import { z } from "zod";

export const registrationSchema = z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    car_type: z.string().min(2),
    car_color: z.string().min(2)
});
