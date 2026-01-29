'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AlertModal from "@/components/AlertModal";

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

    setIsSaved(true);
    setShowAlert(true);
  };

  return (
    <main className='section'>
      <h2 className='section-title'>
        {mode === 'add' ? 'Add New Item' : `Edit Item: ${form.title}`}
      </h2>
      <div className='bg-white rounded-lg shadow'>
        <AlertModal
          open={showAlert}
          message="Data saved successfully"
          onClose={() => setShowAlert(false)}
        />

        <form
          onSubmit={handleSubmit}
          className='p-6 space-y-4'
        >
          
          {/* TITLE */}
          <div>
            <label className='input-label'>
              Title
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
              Price
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
              Description
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
              Category
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
              Image Url
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
              Rating
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
              onClick={() => router.back()}
              className='btn btn-gray px-3 py-2'
            >
              Back
            </button>

            {!isSaved && (
              <button
                type='submit'
                className='btn btn-blue px-4 py-2'
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
