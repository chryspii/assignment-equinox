'use client';

import { useTranslations } from 'next-intl';

type AlertModalProps = {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

export default function AlertModal({ open, title, message, onClose }: AlertModalProps) {
  const t = useTranslations('main');

  if (!open) {
    return null;
  }

  if (!title) {
    title = t('success')
  }

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center'>
      <div
        className='absolute inset-0 bg-black/50'
        onClick={onClose}
      />

      <div className='relative mt-20 bg-white rounded-md shadow-lg w-72 px-4 py-3 text-center'>
        <h2 className='text-sm font-semibold mb-3'>
          {title}
        </h2>

        <p className='text-xs text-gray-600 mb-3'>
          {message}
        </p>

        <button
          onClick={onClose}
          className='btn-blue w-full py-1'
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
}
