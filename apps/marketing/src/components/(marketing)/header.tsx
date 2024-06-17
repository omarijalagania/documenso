'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import LogoImage from 'public/images/oo-logo-32.png';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '~/locales/client';

import { HamburgerMenu } from './mobile-hamburger';
import { MobileNavigation } from './mobile-navigation';

export type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const { getFlag } = useFeatureFlags();

  const options = [
    {
      id: 1,
      value: 'en',
      label: 'EN',
    },
    {
      id: 2,
      value: 'ka',
      label: 'KA',
    },
  ];

  const changeLanguage = (locale: string) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    changeLocale(locale as 'ka' | 'en');
  };

  const isSinglePlayerModeMarketingEnabled = getFlag('marketing_header_single_player_mode');

  return (
    <header className={cn('flex items-center justify-between', className)} {...props}>
      <div className="flex items-center space-x-4">
        <Link href="/" className="z-10" onClick={() => setIsHamburgerMenuOpen(false)}>
          <Image
            src={LogoImage}
            alt="Documenso Logo"
            className="dark:invert"
            width={170}
            height={25}
          />
        </Link>

        {isSinglePlayerModeMarketingEnabled && (
          <Link
            href="/singleplayer"
            className="bg-primary dark:text-background rounded-full px-2 py-1 text-xs sm:px-3"
          >
            Try now!
          </Link>
        )}
      </div>

      <div className="hidden items-center gap-x-6 md:flex">
        <Link
          href={`/${currentLocale}/pricing`}
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm"
        >
          {scopedT('pricing')}
        </Link>

        {/* <Link
          
          href={`/${currentLocale}/contact`}
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm"
        >
          {scopedT('contact')}
        </Link> */}

        {/* <Link
          
          href={`/${currentLocale}/about`}
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm"
        >
          {scopedT('about')}
        </Link> */}

        <Link
          href="https://app.documenso.com/signin?utm_source=marketing-header"
          target="_blank"
          className="text-muted-foreground hover:text-muted-foreground/80 text-sm"
        >
          {scopedT('auth')}
        </Link>

        <Button className="rounded-full" size="sm" asChild>
          <Link href="https://app.documenso.com/signup?utm_source=marketing-header" target="_blank">
            {scopedT('register')}
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs">
            {options.find((item) => item.value === currentLocale)?.label}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />

            {options.map((option) => (
              <DropdownMenuItem
                className="text-xs"
                key={option.id}
                onClick={() => changeLanguage(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <HamburgerMenu
        onToggleMenuOpen={() => setIsHamburgerMenuOpen((v) => !v)}
        isMenuOpen={isHamburgerMenuOpen}
      />
      <MobileNavigation
        isMenuOpen={isHamburgerMenuOpen}
        onMenuOpenChange={setIsHamburgerMenuOpen}
      />
    </header>
  );
};
