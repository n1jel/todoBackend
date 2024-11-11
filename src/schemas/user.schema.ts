import { z } from 'zod'

export const userSchemaZod = z.object({
  username: z
    .string({ message: 'username is required' })
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string({ message: 'password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be less than 30 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
})

export const userLoginSchemaZod = z.object({
  username: z
    .string({ message: 'username is required' })
    .min(1, 'Username is required'),
  password: z
    .string({ message: 'password is required' })
    .min(1, 'Password is required')
})

export type UserType = z.infer<typeof userSchemaZod>

export type UserLoginType = z.infer<typeof userLoginSchemaZod>
