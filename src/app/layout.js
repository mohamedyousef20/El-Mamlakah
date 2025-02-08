// app/layout.js
// import { Noto_Sans_Arabic } from 'next/font/google';
import { Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';

// Load the Noto Sans Arabic font
const KufiArabic = Noto_Kufi_Arabic({
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
      <body className={KufiArabic.className}>{children}</body>
    </html>
  );
}