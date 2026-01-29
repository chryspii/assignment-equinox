'use client';

import Form, { FormData } from '../form';

export default function AddPage() {
  const handleSubmit = (data: FormData) => {
    console.log('add new item', data);
  };

  return <Form mode='add' onSubmit={handleSubmit} />;
}
