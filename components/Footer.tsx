'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='h-12 bg-gray-800 text-gray-300 flex items-center justify-center'>
      {t('footer')}
    </footer>
  );
}
