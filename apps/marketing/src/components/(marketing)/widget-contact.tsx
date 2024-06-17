'use client';

import type { HTMLAttributes, KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';
import { env } from 'next-runtime-env';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { Card } from '@documenso/ui/primitives/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
import { SignaturePad } from '@documenso/ui/primitives/signature-pad';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { claimPlan } from '~/api/claim-plan/fetcher';

import { STEP } from '../constants';

const ZWidgetFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    name: z.string().trim().min(3, { message: 'Please enter a valid name.' }),
  })
  .and(
    z.union([
      z.object({
        signatureDataUrl: z.string().min(1),
        signatureText: z.null().or(z.string().max(0)),
      }),
      z.object({
        signatureDataUrl: z.null().or(z.string().max(0)),
        signatureText: z.string().trim().min(1),
      }),
    ]),
  );

export type TWidgetFormSchema = z.infer<typeof ZWidgetFormSchema>;

type StepKeys = keyof typeof STEP;
type StepValues = (typeof STEP)[StepKeys];

export type WidgetProps = HTMLAttributes<HTMLDivElement>;

export const WidgetContact = ({ className, children, ...props }: WidgetProps) => {
  const { toast } = useToast();
  const event = usePlausible();

  const [step, setStep] = useState<StepValues>(STEP.EMAIL);
  const [showSigningDialog, setShowSigningDialog] = useState(false);
  const [draftSignatureDataUrl, setDraftSignatureDataUrl] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TWidgetFormSchema>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      signatureDataUrl: null,
      signatureText: '',
    },
    resolver: zodResolver(ZWidgetFormSchema),
  });

  const signatureDataUrl = watch('signatureDataUrl');
  const signatureText = watch('signatureText');

  const stepsRemaining = useMemo(() => {
    if (step === STEP.NAME) {
      return 2;
    }

    if (step === STEP.EMAIL) {
      return 3;
    }

    return 1;
  }, [step]);

  const onNextStepClick = () => {
    if (step === STEP.EMAIL) {
      setStep(STEP.NAME);

      setTimeout(() => {
        document.querySelector<HTMLElement>('#name')?.focus();
      }, 0);
    }

    if (step === STEP.NAME) {
      setStep(STEP.SIGN);

      setTimeout(() => {
        document.querySelector<HTMLElement>('#signatureText')?.focus();
      }, 0);
    }
  };

  const onEnterPress = (callback: () => void) => {
    return (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        callback();
      }
    };
  };

  const onSignatureConfirmClick = () => {
    setValue('signatureDataUrl', draftSignatureDataUrl);
    setValue('signatureText', '');

    void trigger('signatureDataUrl');
    setShowSigningDialog(false);
  };

  const onFormSubmit = async ({
    email,
    name,
    signatureDataUrl,
    signatureText,
  }: TWidgetFormSchema) => {
    try {
      const delay = new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });

      const planId = env('NEXT_PUBLIC_STRIPE_COMMUNITY_PLAN_MONTHLY_PRICE_ID');

      if (!planId) {
        throw new Error('No plan ID found.');
      }

      const claimPlanInput = signatureDataUrl
        ? {
            name,
            email,
            planId,
            signatureDataUrl: signatureDataUrl,
            signatureText: null,
          }
        : {
            name,
            email,
            planId,
            signatureDataUrl: null,
            signatureText: signatureText ?? '',
          };

      const [result] = await Promise.all([claimPlan(claimPlanInput), delay]);

      event('claim-plan-widget');

      window.location.href = result;
    } catch (error) {
      event('claim-plan-failed');

      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      className="mt-12"
      variants={{
        initial: {
          scale: 0.2,
          opacity: 0,
        },
        animate: {
          scale: 1,
          opacity: 1,
          transition: {
            ease: 'easeInOut',
            delay: 0.2,
            duration: 0.8,
          },
        },
      }}
      initial="initial"
      animate="animate"
    >
      <Card className={cn('mx-auto rounded-3xl before:rounded-3xl', className)} gradient {...props}>
        <div className="grid grid-cols-12  gap-y-8 overflow-hidden p-2 lg:gap-x-3">
          <div className="text-muted-foreground col-span-12 flex flex-col gap-y-4 p-4 text-xs leading-relaxed lg:col-span-6">
            {children}
          </div>

          <div className="bg-foreground/5 col-span-12 flex flex-col rounded-2xl p-6 lg:col-span-6">
            <div style={{ width: '100%' }}>
              <iframe
                width="100%"
                height={600}
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showSigningDialog} onOpenChange={setShowSigningDialog}>
        <DialogContent position="center">
          <DialogHeader>
            <DialogTitle>Add your signature</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            By signing you signal your support of Documenso's mission in a <br></br>
            <strong>non-legally binding, but heartfelt way</strong>. <br></br>
            <br></br>You also unlock the option to purchase the early supporter plan including
            everything we build this year for fixed price.
          </DialogDescription>

          <SignaturePad
            disabled={isSubmitting}
            className="aspect-video w-full rounded-md border"
            defaultValue={signatureDataUrl || ''}
            onChange={setDraftSignatureDataUrl}
          />

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSigningDialog(false)}>
              Cancel
            </Button>

            <Button onClick={() => onSignatureConfirmClick()}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
