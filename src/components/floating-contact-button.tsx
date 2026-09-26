import {MessageCircleIcon} from '@/components/icons';

// Native hash navigation is intentionally repeatable: no preventDefault,
// stale history state, one-shot scroll lock, or JavaScript dependency.
export function FloatingContactButton({locale = 'en'}: {locale?: 'en' | 'ar'}) {
  const label = locale === 'ar' ? 'تواصل معي' : 'Contact me';
  return <a className="cvFloatingContact" href="#contact" aria-label={label} data-label={label}>
    <MessageCircleIcon />
  </a>;
}
