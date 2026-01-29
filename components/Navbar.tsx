'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useLanguage } from '@/app/context/LanguageContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type NavbarProps = {
  onToggleSidebar: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const t = useTranslations('navbar');

  const { lang, setLang } = useLanguage();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { value: 'en', label: 'EN' },
    { value: 'id', label: 'ID' }
  ];

  return (
    <header className='sticky top-0 z-30 h-14 bg-gray-800 text-white px-4'>
      <div className='h-full flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={onToggleSidebar}
            className='flex flex-col gap-1.5'
            aria-label='Toggle sidebar'
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className='flex items-center gap-6'>
          <div ref={langRef} className='relative'>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className='flex items-center gap-1 hover:text-gray-300'
            >
              <span>{lang.toUpperCase()}</span>
              <span className='text-xs'>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>

            {langOpen && (
              <div className='absolute right-0 mt-2 w-15 rounded bg-gray-800 border border-gray-700 shadow-lg z-50'>
                {languages.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setLang(item.value as 'en' | 'id');
                      setLangOpen(false);
                    }}
                    className={`
                      w-full px-3 py-2 text-left 
                      hover:bg-gray-700
                      ${
                        lang === item.value
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-200'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className='flex items-center gap-2 hover:text-gray-300'>
            <div className='w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center'></div>
            <span className='font-medium'>Username</span>
          </button>
        </div>
      </div>
    </header>
  );
}
