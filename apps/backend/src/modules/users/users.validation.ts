import { z } from "zod";


export const createUserSchema = z.object({

    email:
        z.string()
            .email()
            .max(255),

    password:
        z.string()
            .min(8)
            .max(72),

    name:
        z.string()
            .min(3)
            .max(100)

});


export const loginSchema = z.object({

    email:
        z.string()
            .email(),

    password:
        z.string()

});