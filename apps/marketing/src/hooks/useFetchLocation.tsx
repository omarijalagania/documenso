'use client';

import { useEffect, useState } from 'react';

function useFetchLocation() {
  const [locationIp, setLocationIp] = useState<string>('');

  useEffect(() => {
    const locationCheck = localStorage.getItem('locationCheck');

    async function getLocation() {
      if (locationCheck === 'true') {
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        localStorage.setItem('locationCheck', 'true');
        const countryCode = data.CountryCode;
        setLocationIp(countryCode);
        const lang = countryCode === 'GE' ? 'ka' : 'en';
        localStorage.setItem('step-1', JSON.stringify({ language: lang }));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    void getLocation();
  }, []);

  return {
    locationIp,
  };
}

export default useFetchLocation;
