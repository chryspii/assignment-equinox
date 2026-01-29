'use client';

import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { store } from '@/store';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem('listState', JSON.stringify(store.getState().list));
    });

    return unsubscribe;
  }, []);

  return (
    <html lang='en'>
      <Provider store={store}>
        <body>
          <Sidebar expanded={sidebarExpanded} />

          <div
            className={`
              ml-16 transition-all duration-300 min-h-screen flex flex-col
              ${sidebarExpanded ? 'md:ml-64' : 'md:ml-16'}                
            `}
          >
            <Navbar onToggleSidebar={() => setSidebarExpanded((v) => !v)} />

            <main className='flex-1 p-6 bg-gray-100'>
              {children}
            </main>

            <Footer />
          </div>
        </body>
      </Provider>
    </html>
  );
}
