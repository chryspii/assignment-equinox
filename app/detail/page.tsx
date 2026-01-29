'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import DetailSkeleton from '@/components/skeletons/DetailSkeleton'

type Item = {
  name: string;
  url: string;
}

type ItemOption = {
  id: number;
  name: string;
};

type ItemDetail = {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
};

export default function DetailPage() {
  const t = useTranslations('main');

  const [items, setItems] = useState<ItemOption[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [detail, setDetail] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('selectedItemId');
    const shouldShow = localStorage.getItem('itemDetailShown');

    if (savedId) {
      setSelectedId(Number(savedId));

      if (shouldShow === 'true') {
        fetchDetail(Number(savedId));
      }
    }
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/berry?limit=100')
      .then((res) => res.json())
      .then((res) => {
        const mapped = res.results.map((item: Item) => ({
          name: item.name,
          id: Number(item.url.split('/').filter(Boolean).pop())
        }));

        setItems(mapped);
      });
  }, []);

  const fetchDetail = async (id: number) => {
    setLoading(true);
    setDetail(null);

    const res = await fetch(`https://pokeapi.co/api/v2/berry/${id}`);
    const data = await res.json();

    setDetail(data);
    setLoading(false);
  };

  const handleGo = () => {
    if (!selectedId) {
      return;
    }

    localStorage.setItem('selectedItemId', String(selectedId));
    localStorage.setItem('itemDetailShown', 'true');

    fetchDetail(selectedId);
  };

  return (
    <main className='section'>
      <h2 className='section-title'>
        {t('detail')}
      </h2>

      <div className='card'>
        <div className='flex gap-2 p-4'>
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(Number(e.target.value));
              setDetail(null);
              localStorage.removeItem('itemDetailShown');
            }}
            className='select-base flex-1'
          >
            <option value=''>{t('select item')}</option>
            {items.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleGo()}
            disabled={!selectedId}
            className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-40'
          >
            {t('go')}
          </button>
        </div>
      </div>

      <div className='card'>
        {loading && <DetailSkeleton />}

        {detail && (
          <div className='border rounded p-4 mt-2 space-y-2'>
            <table className='table-base'>
              <tbody>
                <tr className='border-none'>
                  <td className='whitespace-nowrap w-20'>
                    {t('name')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.name}
                  </td>
                </tr>

                <tr className='border-none'>
                  <td className='whitespace-nowrap'>
                    {t('growth time')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.growth_time}
                  </td>
                </tr>

                <tr className='border-none'>
                  <td className='whitespace-nowrap'>
                    {t('max harvest')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.max_harvest}
                  </td>
                </tr>

                <tr className='border-none'>
                  <td className='whitespace-nowrap'>
                    {t('size')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.size}
                  </td>
                </tr>

                <tr className='border-none'>
                  <td className='whitespace-nowrap'>
                    {t('smoothness')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.smoothness}
                  </td>
                </tr>

                <tr className='border-none'>
                  <td className='whitespace-nowrap'>
                    {t('soil dryness')}
                  </td>
                  <td className='whitespace-nowrap'>
                    : {detail.soil_dryness}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
