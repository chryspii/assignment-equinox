'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage, setLimit, setSearch, setSortOrder, setSelected, setSelectedDetail, clearSelectedDetail } from '@/store/listSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPen, faTrash, faTimes, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import TableSkeleton from '@/components/skeletons/TableSkeleton';

type Item = {
  id: number;
  name: string;
  url: string;
};

export default function ListPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { page, limit, search, sortOrder } = useAppSelector((state) => state.list);
  const selectedDetail = useAppSelector((state) => state.list.selectedDetail);

  const [data, setData] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const offset = (page - 1) * limit;

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/berry/?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setTotal(res.count);

        const withId = res.results.map(
          (item: { name: string; url: string }) => {
            const id = Number(item.url.split('/').filter(Boolean).pop());

            return {
              ...item,
              id,
            };
          }
        );

        setData(withId);
      })
      .finally(() => setLoading(false));
  }, [offset, limit]);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <main className='section'>
      <h2 className='section-title'>List</h2>

      {selectedDetail && (
        <div className='card mb-2'>
          <div className='relative overflow-x-auto px-4 py-4'>
            <div className='flex items-center gap-3 text-gray-700'>
              <span>
                Selected Item: {selectedDetail.name}
              </span>

              <button
                onClick={() => dispatch(clearSelectedDetail())}
                className='btn btn-red px-1.5 py-1'
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='card'>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-2'>
            <span>Show</span>

            <select
              value={limit}
              onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
              className='select-base'
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>

            <span>Items</span>
          </div>

          <div className='flex items-center gap-2'>
            <input
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder='Search...'
              className='input-base'
            />

            <button
              className='btn btn-green px-3 py-2'
              onClick={() => router.push('/form/add')}
            >
              Add
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className='p-4 border-y'>
          <table className='table-base'>
            <thead>
              <tr>
                <th scope='col' className='w-16 text-center'>
                  No
                </th>

                <th
                  scope='col'
                  className='cursor-pointer'
                  onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
                >
                  <div className='flex items-center gap-1'>
                    Name

                    <span>
                      <FontAwesomeIcon icon={sortOrder === 'asc' ? faCaretUp : faCaretDown} />
                    </span>
                  </div>
                </th>

                <th scope='col' className='w-32 text-center'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={limit} />
              ) : (
                sorted.map((item, i) => (
                  <tr key={item.name}>
                    <td className='whitespace-nowrap text-center'>
                      {offset + i + 1}
                    </td>

                    <td className='whitespace-nowrap'>
                      {item.name}
                    </td>

                    <td className='whitespace-nowrap text-center space-x-2'>
                      <button
                        className='btn btn-gray px-2 py-1'
                        onClick={() => dispatch(setSelectedDetail(item))}
                      >
                        Detail
                      </button>

                      <button
                          className='btn btn-blue px-2 py-1'
                          onClick={() => {
                            dispatch(setSelected(item));
                            router.push('/form/edit');
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>

                      <button className='btn btn-red px-2 py-1'>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center p-4'>
          <div className='flex items-center gap-1'>
            <button
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
              className='btn btn-default px-3 py-2 hover:bg-gray-200'
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => dispatch(setPage(p))}
                  className={`btn btn-default px-3 py-2
                    ${page === p ? 'bg-gray-300 font-medium' : 'hover:bg-gray-200'}
                  `}
                >
                  {p}
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
              className='btn btn-default px-3 py-2 hover:bg-gray-200'
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
