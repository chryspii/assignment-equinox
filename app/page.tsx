'use client';

import { useTranslations } from 'next-intl';

export default function AdminPage() {
  const t = useTranslations('main');

  return (
    <main className='section'>
      <h2 className='section-title'>
        {t('dashboard')}
      </h2>

      <div className='card'>
        <div className='p-4'>
          {t('welcome')}
        </div>
      </div>
    </main>
  );
}
