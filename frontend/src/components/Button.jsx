import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-sun text-navy hover:bg-[#ffc933]',
  navy: 'bg-navy text-ice hover:bg-brand',
  outline: 'border-2 border-current',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}