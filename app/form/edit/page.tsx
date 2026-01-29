'use client';

import { useAppSelector } from '@/store/hooks';
import Form, { FormData } from '../form';

export default function EditPage() {
  const selected = useAppSelector((state) => state.list.selected);

  if (!selected) {
    return null;
  }

  const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = (data: FormData) => {
    console.log('edit item', selected.id, data);
  };

  return (
    <Form
      mode='edit'
      initialData={{
        title: selected.name,
        price: getRandomNumber(100, 500),
        description: 'Some example description here',
        category: 'Berry',
        image: 'http://image-url-sample.com/no-images.jpeg',
        rating: getRandomNumber(1, 5),
      }}
      onSubmit={handleSubmit}
    />
  );
}
