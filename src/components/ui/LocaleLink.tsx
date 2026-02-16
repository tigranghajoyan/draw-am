import { Link, type LinkProps } from 'react-router-dom';
import { useLocale } from '@/i18n/context';

export default function LocaleLink({ to, ...props }: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  const locale = useLocale();
  const localeTo = `/${locale}${to === '/' ? '' : to}`;
  return <Link to={localeTo} {...props} />;
}
