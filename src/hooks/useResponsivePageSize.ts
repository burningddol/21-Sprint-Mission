import { useState, useEffect } from 'react';
import type { PageSize } from '../types/product';

const BREAKPOINTS = {
  mobile: '(max-width: 743px)',
  tablet: '(max-width: 1200px)',
};

const PAGE_SIZES: Record<string, PageSize> = {
  mobile: { best: 1, all: 4 },
  tablet: { best: 2, all: 6 },
  desktop: { best: 4, all: 10 },
};

function getCurrentPageSize(): PageSize {
  if (window.matchMedia(BREAKPOINTS.mobile).matches) return PAGE_SIZES.mobile;
  if (window.matchMedia(BREAKPOINTS.tablet).matches) return PAGE_SIZES.tablet;
  return PAGE_SIZES.desktop;
}

export default function useResponsivePageSize(): PageSize {
  const [pageSize, setPageSize] = useState<PageSize>(getCurrentPageSize);

  useEffect(() => {
    const mobileMedia = window.matchMedia(BREAKPOINTS.mobile);
    const tabletMedia = window.matchMedia(BREAKPOINTS.tablet);

    const handleChange = () => setPageSize(getCurrentPageSize());

    mobileMedia.addEventListener('change', handleChange);
    tabletMedia.addEventListener('change', handleChange);

    return () => {
      mobileMedia.removeEventListener('change', handleChange);
      tabletMedia.removeEventListener('change', handleChange);
    };
  }, []);

  return pageSize;
}
