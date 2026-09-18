import type {Metadata} from 'next';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Content Studio',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: '/keystatic',
  },
};

export default function Layout() {
  return <KeystaticApp />;
}
