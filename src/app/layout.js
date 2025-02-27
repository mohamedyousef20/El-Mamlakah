// app/layout.js
import './globals.css';
import { Noto_Kufi_Arabic } from 'next/font/google';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import IconNavBar from '@/components/IconNavBar';
import { Almarai } from 'next/font/google';

const kufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['500', '600', '800'],
});

export const metadata = {
  title: 'el-mamlaka',
  description: 'Service provider',
};

export default function RootLayout({ children }) {

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={kufiArabic.className}>
        <NavBar />
        <IconNavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
