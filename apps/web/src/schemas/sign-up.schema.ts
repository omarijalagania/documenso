import { z } from 'zod';

import { messages } from '../config/messages';
import { validateEmail } from './validators/common-rules';

// form zod validation schema
export const signUpSchema = z
  .object({
    email: validateEmail,
    name: z.string().trim().min(1, {
      message: messages.fullNameIsRequired,
    }),
    surName: z.string().trim().min(1, {
      message: messages.lastNameRequired,
    }),
    language: z.string().trim().min(2),

    phone: z.string(),
    // phone: z.string().min(5, {
    //   message: 'phone',
    // }),

    password: z.string().trim().min(6, messages.passwordLengthMin),
    repeatPassword: z.string().min(6, messages.passwordLengthMin),

    //industry: z.string().trim().min(1, messages.industryIsRequired),
    // isAgreed: z.boolean().refine((value) => value === true, {
    //   message: 'Please agree to the terms and conditions',
    // }),
    // isAgreed: z.boolean().refine((value) => value === true, {
    //   message: messages.phoneLengthEn,
    // }),
  })

  .refine(
    (values) => {
      if (values.language === 'ka') {
        return values.phone.length >= 12 && values.phone.length <= 12;
      } else if (values.language === 'en') {
        return values.phone.length >= 12 && values.phone.length <= 12;
      }
      return true;
    },
    {
      message: messages.phoneNumberIsRequired,

      path: ['phone'],
    },
  )
  .refine((values) => values.password === values.repeatPassword, {
    message: 'passwordMatch',
    path: ['repeatPassword'],
  });

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
