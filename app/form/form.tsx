'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/store/hooks';

import AlertModal from '@/components/AlertModal';

export type FormData = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
};

type Props = {
  mode: 'add' | 'edit';
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
};

export default function Form ({ mode, initialData, onSubmit }: Props) {
  const router = useRouter();
  const t = useTranslations('main');
  const selected = useAppSelector((state) => state.list.selected);

  const [form, setForm] = useState<FormData>({
    title: initialData?.title ?? '',
    price: initialData?.price ?? 0,
    description: initialData?.description ?? '',
    category: initialData?.category ?? '',
    image: initialData?.image ?? '',
    rating: initialData?.rating ?? 0,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: (name === 'price' || name === 'rating') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleSave = async () => {
    try {
      let url = 'https://fakestoreapi.com/products'
      let method = 'POST'
      if (mode === 'edit') {
        url = `https://fakestoreapi.com/products/${selected!.id}`
        method = 'PUT'
      }

      const body = JSON.stringify({
        title: form.title,
        price: Number(form.price),
        description: form.description,
        image: form.image,
        category: form.category
      })

      const res = await fetch(url,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body
        }
      );

      if (!res.ok) {
        throw new Error('Failed to save data');
      }

      const data = await res.json();
      console.log(mode === 'edit' ? 'Updated:' : 'Created:', data);

      setIsSaved(true);
      setShowAlert(true);
    } catch (error) {
      console.error(error);

      alert('Failed to save data');
    }
  };

  return (
    <main className='section'>
      <h2 className='section-title'>
        {mode === 'add' ? t('add new item') : `${t('edit item')}: ${form.title}`}
      </h2>
      <div className='bg-white rounded-lg shadow'>
        <AlertModal
          open={showAlert}
          message={t('success message')}
          onClose={() => setShowAlert(false)}
        />

        <form
          onSubmit={handleSubmit}
          className='p-6 space-y-4'
        >
          
          {/* TITLE */}
          <div>
            <label className='input-label'>
              {t('title')}
            </label>

            <input
              id='title'
              name='title'
              value={form.title}
              onChange={handleChange}
              disabled={isSaved}
              className={`input-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
              required
            />
          </div>

          {/* PRICE */}
          <div>
            <label className='input-label'>
              {t('price')}
            </label>

            <input
              type='number'
              id='price'
              name='price'
              value={form.price}
              onChange={handleChange}
              disabled={isSaved}
              className={`input-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className='input-label'>
              {t('description')}
            </label>

            <textarea
              id='description'
              name='description'
              value={form.description}
              onChange={handleChange}
              disabled={isSaved}
              rows={3}
              className={`textarea-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className='input-label'>
              {t('category')}
            </label>

            <input
              id='category'
              name='category'
              value={form.category}
              onChange={handleChange}
              disabled={isSaved}
              className={`input-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className='input-label'>
              {t('image url')}
            </label>

            <input
              id='image'
              name='image'
              value={form.image}
              onChange={handleChange}
              disabled={isSaved}
              className={`input-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
            />
          </div>

          {/* RATING */}
          <div>
            <label className='input-label'>
              {t('rating')}
            </label>

            <input
              type='number'
              id='rating'
              name='rating'
              value={form.rating}
              onChange={handleChange}
              disabled={isSaved}
              min={0}
              max={5}
              className={`input-base
                ${isSaved ? 'bg-gray-200' : ''}
              `}
            />
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <button
              type='button'
              onClick={() => router.push('/list')}
              className='btn btn-gray px-3 py-2'
            >
              {t('back')}
            </button>

            {!isSaved && (
              <button
                type='submit'
                onClick={handleSave}
                className='btn btn-blue px-4 py-2'
              >
                {t('save')}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
