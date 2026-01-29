'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCircleInfo, faLayerGroup, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  expanded: boolean;
};

export default function Sidebar ({ expanded }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  const menu = [
    { label: t('list'), href: '/list', icon: faList },
    { label: t('detail'), href: '/detail', icon: faCircleInfo }
  ];

  return (
    <aside className={`
      fixed top-0 left-0 h-screen z-40 bg-gray-900 text-gray-100 transition-all duration-300
      ${expanded ? 'w-64' : 'w-16'}
    `}>
      <Link
        href="/"
        className="h-14 flex items-center justify-center transition"
      >
        <span className='text-lg font-semibold'>
          {expanded ? 'Admin' : 'A'}
        </span>
      </Link>

      {expanded && (
        <div className='m-2'>
          <div className='relative w-full'>
            <FontAwesomeIcon
              icon={faLayerGroup}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <select
              className='w-full appearance-none bg-gray-800 border border-gray-700 text-gray-200 rounded py-2 pl-10 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 hover:bg-gray-700'
              defaultValue=''
            >
              <option value='' disabled>{t('module')}</option>
            </select>

            <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs'>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
        </div>
      )}

      <nav className='flex flex-col m-2'>
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 p-2 rounded cursor-pointer
                hover:bg-gray-700
                ${active ? 'bg-gray-700' : ''}
                ${expanded ? '' : 'justify-center'}
              `}
            >
              <FontAwesomeIcon icon={item.icon} />
              {expanded && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
