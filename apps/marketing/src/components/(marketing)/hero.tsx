'use client';

import Link from 'next/link';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';
import { match } from 'ts-pattern';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@documenso/ui/primitives/card';

import { Widget } from './widget';

export type HeroProps = {
  className?: string;
  [key: string]: unknown;
};

const BackgroundPatternVariants: Variants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,

    transition: {
      delay: 1,
      duration: 1.2,
    },
  },
};

const HeroTitleVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Hero = ({ className, ...props }: HeroProps) => {
  const event = usePlausible();

  const { getFlag } = useFeatureFlags();

  const heroMarketingCTA = getFlag('marketing_landing_hero_cta');

  const onSignUpClick = () => {
    const el = document.getElementById('email');

    if (el) {
      const { top } = el.getBoundingClientRect();

      window.scrollTo({
        top: top - 120,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => {
        el.focus();
      });
    }
  };

  return (
    <motion.div className={cn('relative', className)} {...props}>
      {/* <div className="absolute -inset-24 -z-10">
        <motion.div
          className="flex h-full w-full origin-top-right items-center justify-center"
          variants={BackgroundPatternVariants}
          initial="initial"
          animate="animate"
        >
          <Image
            src={backgroundPattern}
            alt="background pattern"
            className="-mr-[50vw] -mt-[15vh] h-full scale-125 object-cover dark:contrast-[70%] dark:invert dark:sepia md:scale-150 lg:scale-[175%]"
          />
        </motion.div>
      </div> */}

      <div className="relative">
        <motion.h2
          variants={HeroTitleVariants}
          initial="initial"
          animate="animate"
          className="text-center text-4xl font-bold leading-tight tracking-tight md:text-[48px] lg:text-[64px]"
        >
          ელექტრონული ხელმოწერა
        </motion.h2>
        {/* 
        <motion.div
          variants={HeroTitleVariants}
          initial="initial"
          animate="animate"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <Button
            type="button"
            variant="outline"
            className="rounded-full bg-transparent backdrop-blur-sm"
            onClick={onSignUpClick}
          >
            Claim Early Adopter Plan
            <span className="bg-primary dark:text-background -mr-2.5 ml-2.5 rounded-full px-2 py-1.5 text-xs font-medium">
              $30/mo
            </span>
          </Button>

          <Link href="https://github.com/documenso/documenso" onClick={() => event('view-github')}>
            <Button variant="outline" className="rounded-full bg-transparent backdrop-blur-sm">
              <LuGithub className="mr-2 h-5 w-5" />
              Star on GitHub
            </Button>
          </Link>
        </motion.div> */}

        <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>შექმენი</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ატვირთე დოკუმენტის ნებისმიერი ფორმატი მარტივად შენი მოწყობილობიდან ან დოკუმენტების
                ელექტრონული საცავიდან, როგორიცაა Google Drive, OneDrive, Dropbox. მიუთითე
                ხელმომწერები, თანმიმდევრობა, მონიშნე ადგილი ხელმოწერისთვის და გააგზავნე.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>გააგზავნე</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                მოაწერე ხელი ელექტრონულად, ნებისმიერი მოწყობილობიდან და ადგილიდან, მოხაზე ეკრანზე
                ხელმოწერა ან გადაუღე სურათი შენს ფაქსიმილეს. საჭიროების შემთხევაში მოითხოვე
                ხელმომწერის ID ვერიფიკაცია და დარწმუნდი მისი ვინაობის ნამდვილობაში.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>მოაწერე</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                გაუგზავნე მომენტალურად ხელმომწერებს შეტყობინება ელ. ფოსტით და SMS-ით. დოკუმენტზე
                წვდომა და ხელმოწერა შესაძლებელია ნებისმიერი მოწყობილობიდან. შეამოწმე სტატუსი და
                საჭიროების შემთხვევაში გააგზავნე შეხსენება.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>მზადაა</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                შეინახე ციფრული შტამპით დამოწმებული დოკუმენტი ორიენტ ოფისში ან სხვა მოწყობილობასა თუ
                ქლაუდზე დეტალური რეპორტით: თარიღი, დრო, ხელმომწერები, IP მისამართი, მოწყობილობა,
                ბრაუზერი და ა.შ.
              </p>
            </CardContent>
          </Card>
        </div>

        {match(heroMarketingCTA)
          .with('spm', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="border-primary bg-background hover:bg-muted mx-auto mt-8 w-60 rounded-xl border transition-colors duration-300"
            >
              <Link href="/singleplayer" className="block px-4 py-2 text-center">
                <h2 className="text-muted-foreground text-xs font-semibold">
                  Introducing Single Player Mode
                </h2>

                <h1 className="text-foreground mt-1.5 font-medium leading-5">
                  Self sign for free!
                </h1>
              </Link>
            </motion.div>
          ))
          .with('productHunt', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-4"
            >
              <Link
                href="https://www.producthunt.com/posts/documenso?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-documenso"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=395047&theme=light&period=daily"
                  alt="Documenso - The open source DocuSign alternative | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                />
              </Link>
            </motion.div>
          ))
          .otherwise(() => null)}

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
                delay: 0.5,
                duration: 0.8,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <Widget className="mt-12">
            <strong>ელექტრონული ხელმოწერა</strong>
            <p className="w-full max-w-[70ch]">
              ტექნოლოგიების განვითარებასთან ერთად, ელექტრონული ხელმოწერა ეტაპობრივად ანაცვლებს
              მატერიალურს და აქვს თანაბარი იურიდიული ძალა. ორიენტ ოფისის დახმარებით, შეგიძლიათ
              ისარგებლოთ როგორც ელექტრონული, ასევე კვალიფიციური ელექტრონული ხელმოწერით. კვალიფიციური
              ელექტრონული ხელმოწერა იყენებს ID ბარათს და სპეციალურ წამკითხველ USB მოწყობილობას,
              რომელიც ფიზიკურად თან უნდა გქონდეთ ხელის მოწერისას.
            </p>

            <p className="w-full max-w-[70ch]">
              ელექტრონული ხელმოწერა არის უფრო მარტივი, კომფორტული, უსაფრთხო და არ საჭიროებს
              დამატებით მოწყობილობას. ორიენტ ოფისის ელექტრონული ხელმოწერა, რომელიც აკმაყოფილებს
              საერთაშორისო სტანდარტებს, უზრუნველყოფს დოკუმენტზე ელექტრონულად ხელის მოწერას მსოფლიოს
              ნებისმიერი წერტილიდან, პერსონალური კომპიუტერის ან ნებისმიერი სმარტფონის გამოყენებით და
              ბიზნეს პროცესების აჩქარებას. ელექტრონული ხელმოწერა შეგიძლიათ გამოიყენოთ იურიდიულ,
              საგანმათლებლო, საბანკო - საფინანსო, სატელეკომუნიკაციო, სამშენებლო, უძრავი ქონების,
              ჯანდაცვის, დაზღვევის და სხვა სფეროებში.
            </p>

            <div className="flex h-24 items-center">
              <p className={cn('text-5xl [font-family:var(--font-caveat)]')}>Timur & Lucas</p>
            </div>

            <div>
              <strong>Timur Ercan & Lucas Smith</strong>
              <p className="mt-1">Co-Founders, Documenso</p>
            </div>
          </Widget>
        </motion.div>
      </div>
    </motion.div>
  );
};
