import localFont from 'next/font/local';
import './globals.css';
import './styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const font = localFont({
  src: './fonts/InstrumentSans.ttf',
  weight: '400',
});

export const metadata = {
  title: 'Optimuxx',
  description: 'Optimuxx provides top-tier DDoS protection services to safeguard your online platform from malicious traffic and attacks.',
  keywords: 'DDoS protection, cybersecurity, bot blocking, IP blocking, rate limiting, Optimuxx',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={font.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
  );
}