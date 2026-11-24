import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import GlobalLoader from '../components/GlobalLoader';
import ToastHost from '../components/ToastHost';

export const metadata = { title: 'HexFleet', description: 'Fleet intelligence, in motion.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body><SmoothScroll /><GlobalLoader /><ToastHost />{children}</body></html>;
}
