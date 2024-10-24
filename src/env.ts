import { z } from 'zod'

const envSchema = z.object({
    DB_HOST: z.string({ message: 'Necessário informar o host do banco de dados' }),
    DB_USERNAME: z.string({ message: 'Necessário informar o usuário do banco de dados' }),
    DB_PASSWORD: z.string({ message: 'Necessário informar a senha do banco de dados' }),
    DB_NAME: z.string({ message: 'Necessário informar o banco de dados' }),
    MONGO_USER: z.string({ message: 'Necessário informar o banco de dados' }),
    MONGO_PASSWORD: z.string({ message: 'Necessário informar o banco de dados' }),
    MONGO_HOST: z.string({ message: 'Necessário informar o banco de dados' }),
    MONGO_APPNAME: z.string({ message: 'Necessário informar o banco de dados' }),
    MONGO_DATABASE: z.string({ message: 'Necessário informar o banco de dados' }),
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.coerce.number().default(3555),
})

type Env = z.infer<typeof envSchema>;

// export const env = envSchema.parse(process.env)

export { Env, envSchema }