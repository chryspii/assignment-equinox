'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type NavbarProps = {
  onToggleSidebar: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
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
          <button className='flex items-center gap-2 hover:text-gray-300'>
            <div className='w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center'></div>
            <span className='font-medium'>Username</span>
          </button>
        </div>
      </div>
    </header>
  );
}
