/* eslint-disable @typescript-eslint/require-await */
'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import communityCardsImage from '@documenso/assets/images/community-cards.png';
import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
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

import { UserProfileTimur } from '~/components/ui/user-profile-timur';
import { useScopedI18n } from '~/locales/client';
import type { SignUpSchema } from '~/schemas/sign-up.schema';
import { signUpSchema } from '~/schemas/sign-up.schema';

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/require-await */

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
  const utmSrc = searchParams?.get('utm_source') ?? null;

  const baseUrl = new URL(NEXT_PUBLIC_WEBAPP_URL() ?? 'http://localhost:3000');

  const form = useForm<SignUpSchema>({
    values: {
      name: '',
      surName: '',
      email: '',
      language: '',
      password: '',
      repeatPassword: '',
      phone: '',
      industry: '',
      isAgreed: false,
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const { mutateAsync: signup } = trpc.auth.signup.useMutation();

  const onFormSubmit = async ({
    name,
    email,
    password,
    phone,
    industry,
    language,
    surName,
  }: SignUpSchema) => {
    try {
      //await signup({ name, email, password, phone, industry, language, surName});

      //  router.push(`/unverified-account`);

      toast({
        title: 'Registration Successful',
        description:
          'You have successfully registered. Please verify your account by clicking on the link you received in the email.',
        duration: 5000,
      });

      analytics.capture('App: User Sign Up', {
        email,
        timestamp: new Date().toISOString(),
        custom_campaign_params: { src: utmSrc },
      });
    } catch (err) {
      toast({
        title: 'An unknown error occurred',
        description: 'We encountered an unknown error while attempting to sign you Up.',
      });
    }
  };

  const onNextClick = async () => {
    const valid = await form.trigger(['name', 'email', 'password']);

    if (valid) {
      setStep('CLAIM_USERNAME');
    }
  };

  return (
    <div className={cn('flex justify-center gap-x-12', className)}>
      <div className="border-border relative hidden flex-1 overflow-hidden rounded-xl border xl:flex">
        <div className="absolute -inset-8 -z-[2] backdrop-blur">
          <Image
            src={communityCardsImage}
            fill={true}
            alt="community-cards"
            className="dark:brightness-95 dark:contrast-[70%] dark:invert"
          />
        </div>

        <div className="bg-background/50 absolute -inset-8 -z-[1] backdrop-blur-[2px]" />

        <div className="relative flex h-full w-full flex-col items-center justify-evenly">
          <div className="bg-background rounded-2xl border px-4 py-1 text-sm font-medium">
            User profiles are coming soon!
          </div>

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
      </div>
      {/* min-h-[min(850px,80vh)] */}
      <div className="border-border dark:bg-background relative z-10 flex  w-full max-w-lg flex-col rounded-xl border bg-neutral-100 p-6">
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
              You will get notified & be able to set up your documenso public profile when we launch
              the feature.
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
                        <Input type="text" {...field} placeholder={scopedT('fillPhone')} />
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
                  <Link href="/signin" className="text-documenso-700 duration-200 hover:opacity-70">
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
                  className="bg-documenso absolute inset-y-0 left-0 rounded-full"
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
                className="flex-1"
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
  );
};
