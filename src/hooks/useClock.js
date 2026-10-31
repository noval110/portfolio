import { useEffect, useState } from 'react';

const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' });

// Local time in Purwokerto (WIB), refreshed every 15s.
export function useClock() {
  const [time, setTime] = useState(() => format.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(format.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}
