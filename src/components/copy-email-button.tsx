'use client';

import {useState} from 'react';
import {CopyIcon} from '@/components/icons';

const EMAIL = 'ibrahim.alajmi407@gmail.com';

type CopyEmailButtonProps = {
  locale?: 'en' | 'ar';
};

export function CopyEmailButton({locale = 'en'}: CopyEmailButtonProps) {
  const ar = locale === 'ar';
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = EMAIL;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="cvContactAction cvContactCopy"
      type="button"
      onClick={copyEmail}
      aria-label={ar ? 'نسخ البريد الإلكتروني' : 'Copy email address'}
    >
      <CopyIcon />
      <span aria-live="polite">{copied ? (ar ? 'تم النسخ' : 'Copied') : (ar ? 'نسخ البريد' : 'Copy email')}</span>
    </button>
  );
}
