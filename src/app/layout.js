'use client';

import './globals.css';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();


  const shouldRenderNavbar = pathname !== '/auth';

  const paddingClass = 
    pathname !== '/auth' && (pathname === '/users' || pathname === '/posts' || pathname === '/dashboard') 
      ? 'pt-20' 
      : '';  

  return (
    <html lang="en">
      <body className={paddingClass}>
        {shouldRenderNavbar && <Navbar />} {/* Navbar will not show on '/auth' */}
        <main>{children}</main>
      </body>
    </html>
  );
}
