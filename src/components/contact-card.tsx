import type {ReactNode} from 'react';

type ContactCardProps = {
  icon: ReactNode;
  label: string;
  value?: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
  valueDir?: 'ltr' | 'rtl';
  className?: string;
};

export function ContactCard({
  icon,
  label,
  value,
  href,
  external = false,
  primary = false,
  valueDir,
  className = '',
}: ContactCardProps) {
  const classes = ['cvContactCard', primary ? 'cvContactCardPrimary' : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="cvContactCardIcon">{icon}</span>
      <span className="cvContactCardCopy">
        <b>{label}</b>
        {value ? <small dir={valueDir}>{value}</small> : null}
      </span>
    </>
  );

  if (!href) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <a
      className={classes}
      href={href}
      {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
    >
      {content}
    </a>
  );
}
