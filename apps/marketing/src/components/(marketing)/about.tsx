/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { motion } from 'framer-motion';

import { useScopedI18n } from '~/locales/client';

import { WidgetNoForm } from './widget-no-form';

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

// ინტერნეტი - GPON და Peer-to-Peer (P2P)
// ვირტუალური ასს (PBX)
// VoIP ტელეფონი (Voice over IP)
// A2P SMS (application-to-person)
// კოლოკაცია (Colocatiin Center)
// ინტერნეტის ურთიერთგაცვლის წერტილი (IXP)
// კორპორატიული შიდა ქსელის დაგეგმვა
// ფილიალებს შორის კავშირის მოწყობა
// ქსელის უსაფრთხოება
// საქალაქთაშორისო ოპტიკურ-ბოჭკოვანი მაგისტრალების მშენებლობა და მათი ტექნიკური მხარდაჭერა.

const uListArray = [
  {
    id: 1,
    value: 'p2p',
  },
  {
    id: 2,
    value: 'pbx',
  },
  {
    id: 3,
    value: 'voip',
  },
  {
    id: 4,
    value: 'a2p',
  },
  {
    id: 5,
    value: 'colocation',
  },
  {
    id: 6,
    value: 'ixp',
  },
  {
    id: 7,
    value: 'corporateNetwork',
  },
  {
    id: 8,
    value: 'branchConnection',
  },
  {
    id: 9,
    value: 'networkSecurity',
  },
  {
    id: 10,
    value: 'opticalFiber',
  },
];

function AboutContainer() {
  const scopedT = useScopedI18n('aboutPage');
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
      <WidgetNoForm className="mt-12">
        {/* <strong>{scopedTDescription('elSign')}</strong> */}
        <p className="w-full text-base">{scopedT('desc1')}</p>
        <ul className="pl-5">
          {uListArray.map((item) => (
            <li key={item.id} className="list-disc text-base">
              {scopedT(item.value as keyof typeof scopedT)}
            </li>
          ))}
        </ul>
        <p className="w-full text-base">{scopedT('desc2')}</p>
        <p className="w-full text-base">{scopedT('desc3')}</p>
      </WidgetNoForm>
    </motion.div>
  );
}

export default AboutContainer;
