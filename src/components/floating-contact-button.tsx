import Link from 'next/link';
import {MessageCircleIcon} from '@/components/icons';

export function FloatingContactButton({locale = 'en'}: {locale?: 'en' | 'ar'}) {
  const label = locale === 'ar' ? 'تواصل معي' : 'Contact me';

  return (
    <Link
      className="cvFloatingContact"
      href="#contact"
      aria-label={label}
      data-label={label}
    >
      <MessageCircleIcon />
    </Link>
  );
}
