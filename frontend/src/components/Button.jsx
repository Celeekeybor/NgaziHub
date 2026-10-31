const variants = {
  primary: 'bg-sun text-navy hover:bg-[#ffc933]',
  outline: 'border border-current hover:bg-white/10',
};

export default function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const classes = `inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}