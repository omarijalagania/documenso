/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */
'use client';

import { useState, useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { WidgetRegister } from '@documenso/marketing/src/components/(marketing)/widget-register';
import { trpc } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { PasswordInput } from '@documenso/ui/primitives/password-input';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { Footer } from '~/components/shared/footer';
import { UserProfileTimur } from '~/components/ui/user-profile-timur';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';
import type { SignUpSchema } from '~/schemas/sign-up.schema';
import { signUpSchema } from '~/schemas/sign-up.schema';
import { userRegister } from '~/services/actions';

import usFlag from '../../../../public/images/en.png';
import geFlag from '../../../../public/images/ka.png';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/require-await */

const SIGN_UP_REDIRECT_PATH = '/documents';

type SignUpStep = 'BASIC_DETAILS' | 'CLAIM_USERNAME';

export const SignUpFormV2 = ({ className }: { className: string }) => {
  const { toast } = useToast();
  const analytics = useAnalytics();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<SignUpStep>('BASIC_DETAILS');
  const scopedT = useScopedI18n('auth');
  const scopedTV = useScopedI18n('validation');
  const utmSrc = searchParams?.get('utm_source') ?? null;
  const currentLocale = useCurrentLocale();
  // const baseUrl = new URL(NEXT_PUBLIC_WEBAPP_URL() ?? 'http://localhost:3000');

  const form = useForm<SignUpSchema>({
    values: {
      name: '',
      surName: '',
      email: '',
      language: currentLocale,
      password: '',
      repeatPassword: '',
      phone: '',
      // industry: '',
      // isAgreed: false,
    },
    defaultValues: {
      name: '',
      surName: '',
      email: '',
      language: currentLocale,
      password: '',
      repeatPassword: '',
      phone: '',
    },
    mode: 'onChange',

    resolver: zodResolver(signUpSchema),
  });

  console.log('form', form.formState.errors);

  // const isSubmitting = form.formState.isSubmitting;

  const { mutateAsync: signup } = trpc.auth.signup.useMutation();
  const [isPending, startTransition] = useTransition();

  const returnError = (response: {
    data: { phone: (string | string[])[]; email: (string | string[])[] };
  }) => {
    if (
      response.data?.phone &&
      response.data.phone[0]?.includes('The phone has already been taken.')
    ) {
      return 'registeredPhone';
    }
    if (
      response.data?.email &&
      response.data.email[0]?.includes('The email has already been taken.')
    ) {
      return 'registeredMail';
    }
  };

  const onFormSubmit = async ({
    name,
    email,
    password,
    repeatPassword,
    phone,
    // industry,
    language,
    surName,
  }: SignUpSchema) => {
    const data = {
      name,
      email,
      password,
      repeatPassword,
      phone: phone.replace(/\s+/g, ''),
      // industry,
      language,
      surName,
    };

    //await signup({ name, email, password, phone, industry, language, surName});

    //  router.push(`/unverified-account`);

    startTransition(async () => {
      const response = await userRegister(data);

      const errorString = returnError(response);

      if (!response.success) {
        toast({
          title: 'An unknown error occurred',
          //@ts-expect-error - This is a valid prop
          description: scopedTV(errorString),
        });
      }

      if (response.success) {
        toast({
          title: 'Registration Successful',
          description:
            'You have successfully registered. Please verify your account by clicking on the link you received in the email.',
          duration: 5000,
        });
      }
    });
  };

  const onNextClick = async () => {
    const valid = await form.trigger([
      'name',
      'email',
      'password',
      'phone',
      'language',
      'surName',
      'repeatPassword',
    ]);

    if (valid) {
      setStep('CLAIM_USERNAME');
    }
  };

  // Handle key press to allow only numeric input
  const handleKeyPress = (event: { charCode: number; preventDefault: () => void }) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  // Handle paste to allow only numeric input
  const handlePaste = (event: {
    clipboardData: { getData: (arg0: string) => string };
    preventDefault: () => void;
  }) => {
    const paste = (event.clipboardData || window.Clipboard).getData('text');
    if (!/^\d*$/.test(paste)) {
      event.preventDefault();
    }
  };

  const formatPhoneNumber = (value: string, lang: string) => {
    if (!value) {
      return '';
    }

    const cleaned = value.replace(/\D/g, ''); // Remove non-numeric characters

    if (lang === 'ka') {
      const match = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,2})(\d{0,2})$/);
      if (match) {
        return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
      }
    } else if (lang === 'en') {
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`.trim();
      }
    }

    return value;
  };

  // Handle change to ensure only numeric values are kept
  const handleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value, currentLocale);

    form.setValue('phone', formattedValue, { shouldValidate: true });
  };

  return (
    <>
      <div className={cn('flex w-full justify-center gap-x-12', className)}>
        <WidgetRegister className="relative hidden  flex-1 rounded-xl  xl:flex">
          {/* <div className="absolute -inset-8 -z-[2] backdrop-blur">
            <Image
              src={communityCardsImage}
              fill={true}
              alt="community-cards"
              className="dark:brightness-95 dark:contrast-[70%] dark:invert"
            />
          </div> */}

          {/* <div className="bg-background/50 absolute -inset-8 -z-[1] backdrop-blur-[2px]" /> */}

          <div className="relative flex h-full w-full flex-col items-center justify-evenly">
            {/* <div className="bg-background rounded-2xl border px-4 py-1 text-sm font-medium">
              User profiles are coming soon!
            </div> */}

            <AnimatePresence>
              {step === 'BASIC_DETAILS' ? (
                <motion.div className="w-full max-w-md" layoutId="user-profile">
                  <UserProfileTimur
                    rows={2}
                    className="bg-background border-border rounded-2xl border shadow-md"
                  />
                </motion.div>
              ) : (
                <motion.div className="w-full max-w-md" layoutId="user-profile">
                  {/* <UserProfileSkeleton
                  user={{ name, url: 'lol' }}
                  rows={2}
                  className="bg-background border-border rounded-2xl border shadow-md"
                /> */}
                </motion.div>
              )}
            </AnimatePresence>

            <div />
          </div>
          <Footer />
        </WidgetRegister>

        {/* min-h-[min(850px,80vh)] */}
        <div className="border-border dark:bg-background bg-muted relative z-10  flex w-full max-w-lg flex-col rounded-xl border p-6">
          {step === 'BASIC_DETAILS' && (
            <div className="h-20">
              <h1 className="text-xl font-semibold md:text-2xl">Create a new account</h1>

              <p className="text-muted-foreground mt-2 text-xs md:text-sm">
                Create your account and start using state-of-the-art document signing. Open and
                beautiful signing is within your grasp.
              </p>
            </div>
          )}

          {step === 'CLAIM_USERNAME' && (
            <div className="h-20">
              <h1 className="text-xl font-semibold md:text-2xl">Claim your username now</h1>

              <p className="text-muted-foreground mt-2 text-xs md:text-sm">
                You will get notified & be able to set up your documenso public profile when we
                launch the feature.
              </p>
            </div>
          )}

          <hr className="-mx-6 my-4" />

          <Form {...form}>
            <form
              className="flex w-full flex-1 flex-col gap-y-4"
              onSubmit={form.handleSubmit(onFormSubmit)}
            >
              {step === 'BASIC_DETAILS' && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" {...field} placeholder={scopedT('name')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" {...field} placeholder={scopedT('surName')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            maxLength={currentLocale === 'ka' ? 12 : 12}
                            minLength={currentLocale === 'ka' ? 12 : 12}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            onPaste={handlePaste}
                            placeholder={scopedT('fillPhone')}
                            //@ts-expect-error - This is a valid prop
                            prefix={
                              <>
                                {currentLocale === 'ka' ? (
                                  <div className="flex items-center space-x-2">
                                    <Image width={20} height={16} src={geFlag} alt="ka" />
                                    <p className="font-mtavruliMedium text-sm">+995</p>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <Image width={20} height={16} src={usFlag} alt="ka" />
                                    <p className="font-mtavruliMedium text-sm">+1</p>
                                  </div>
                                )}
                              </>
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" {...field} placeholder={scopedT('email')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput placeholder={scopedT('password')} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput placeholder={scopedT('repeatPassword')} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-muted-foreground mt-4 text-sm">
                    Already have an account?{' '}
                    <Link
                      href={`/${currentLocale}/signin`}
                      className="text-primary duration-200 hover:opacity-70 dark:text-[#ffeb81]"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </>
              )}

              <div className="mt-6">
                {step === 'BASIC_DETAILS' && (
                  <p className="text-muted-foreground text-sm">
                    <span className="font-medium">Basic details</span> 1/2
                  </p>
                )}

                {step === 'CLAIM_USERNAME' && (
                  <p className="text-muted-foreground text-sm">
                    <span className="font-medium">Claim username</span> 2/2
                  </p>
                )}

                <div className="bg-foreground/40 relative mt-4 h-1.5 rounded-full">
                  <motion.div
                    layout="size"
                    layoutId="document-flow-container-step"
                    className="bg-primary absolute inset-y-0 left-0 rounded-full dark:bg-[#ffeb81]"
                    style={{
                      width: step === 'BASIC_DETAILS' ? '50%' : '100%',
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                {/* Go back button, disabled if step is basic details */}
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  className="border-primary flex-1 border dark:border-0"
                  disabled={step === 'BASIC_DETAILS' || form.formState.isSubmitting}
                  onClick={() => setStep('BASIC_DETAILS')}
                >
                  Back
                </Button>

                {/* Continue button */}
                {step === 'BASIC_DETAILS' && (
                  <Button
                    type="button"
                    size="lg"
                    className="flex-1 disabled:cursor-not-allowed"
                    loading={form.formState.isSubmitting}
                    onClick={onNextClick}
                  >
                    Next
                  </Button>
                )}

                {/* Sign up button */}
                {step === 'CLAIM_USERNAME' && (
                  <Button
                    loading={form.formState.isSubmitting}
                    disabled={!form.formState.isValid}
                    type="submit"
                    size="lg"
                    className="flex-1"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
