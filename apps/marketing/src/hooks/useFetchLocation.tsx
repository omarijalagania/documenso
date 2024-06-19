/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/ban-ts-comment */

function useFetchLocation() {
  const [locationIp, setLocationIp] = useState<string>('');

  useEffect(() => {
    // const locationCheck = localStorage.getItem('locationCheck');

    async function getLocation() {
      // if (locationCheck === 'true') {
      //   return;
      // }

      // eslint-disable-next-line turbo/no-undeclared-env-vars
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      // localStorage.setItem('locationCheck', 'true');
      //@ts-ignore
      const countryCode = data.CountryCode;
      setLocationIp(countryCode);
      const lang = countryCode === 'GE' ? 'ka' : 'en';
      localStorage.setItem('step-1', JSON.stringify({ language: lang }));
    }

    void getLocation();
  }, []);

  return {
    locationIp,
  };
}

export default useFetchLocation;
