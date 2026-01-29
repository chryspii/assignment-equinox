'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Lang = 'en' | 'id';

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en', setLang: () => {}
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    const saved = (localStorage.getItem('lang') as Lang) || 'en';
    setLang(saved);
  }, []);

  useEffect(() => {
    import(`../messages/${lang}.json`).then((m) =>
      setMessages(m.default)
    );

    localStorage.setItem('lang', lang);
  }, [lang]);

  if (!messages) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <NextIntlClientProvider
        locale={lang}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
