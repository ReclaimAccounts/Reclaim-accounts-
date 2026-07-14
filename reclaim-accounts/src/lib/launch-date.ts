// Single source of truth for the launch moment.
// CountdownTimer, BonusBanner and ClaimIcon all read this same constant,
// so the "timer ends -> bonus code appears" behavior always stays in sync.
import { useEffect, useState } from "react";

export const LAUNCH_DATE = "2026-07-15T00:00:00Z";

export function isLaunched(targetDate: string = LAUNCH_DATE): boolean {
  return Date.now() >= new Date(targetDate).getTime();
}

// Shared hook so every CTA button (hero, navbar, mobile menu) flips from
// "Pre-Register" to "Download" at the same moment, without each component
// running its own separate timer.
export function useIsLaunched(targetDate: string = LAUNCH_DATE): boolean {
  const [launched, setLaunched] = useState(() => isLaunched(targetDate));

  useEffect(() => {
    if (launched) return;
    const interval = setInterval(() => {
      if (isLaunched(targetDate)) {
        setLaunched(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [launched, targetDate]);

  return launched;
}
