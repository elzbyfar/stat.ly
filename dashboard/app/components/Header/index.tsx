import useStyles from '@/app/hooks/useStyles';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import icon from '../../lib/icon3.png';

export default function Header() {
  const className = {
    header:
      'fixed top-0 items-center py-2 border-b-[1px] border-b-black/20 bg-white z-10 w-full',
    wrapper: 'w-[1200px] flex justify-between mx-auto',
    // wrapper: 'max-w-[1200px] flex justify-between mx-auto',
    button:
      'flex flex-col items-center justify-center cursor-pointer select-none',
    power: 'font-extrabold tracking-wider text-3xl leading-6',
    dashboard: 'ml-[3px] font-thin tracking-[2.8px] text-xs leading-6',
  };

  const styles = useStyles(className);

  return (
    <header className={styles('header')}>
      <div className={styles('wrapper')}>
        <button className={styles('button')}>
          <img src={icon.src} width="100px" height="50px" alt="icon" />
        </button>
        <button className="hover:bg-zinc-100 p-4 rounded-full">
          <HamburgerMenuIcon />
        </button>
      </div>
    </header>
  );
}
