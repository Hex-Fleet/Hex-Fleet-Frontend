import './globals.css';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = { title: 'HexFleet', description: 'Fleet intelligence, in motion.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body><SmoothScroll />{children}</body></html>;
}
