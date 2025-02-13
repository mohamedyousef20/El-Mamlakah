// app/layout.js
import './globals.css';
import { Noto_Kufi_Arabic } from 'next/font/google';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import IconNavBar from '@/components/IconNavBar';

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
        {/* Metadata can also be injected here if needed */}
      </head>
      <body className={kufiArabic.className}>
        {/* <NavBar /> */}
        <IconNavBar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
