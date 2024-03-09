import type { Metadata } from 'next';
import './globals.css';
import AppState from './context/AppState';
import useStyles from './hooks/useStyles';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'Power Dash',
  description: 'Generate power logs and visualize them in real-time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = {
    main: 'flex min-h-screen flex-col items-center py-24 gap-y-8 mx-auto',
    wrapper:
      'bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] w-[1200px]',
    body: 'bg-gradient-to-r from-yellow-500/10 to-rose-500/10 w-full',
  };

  const styles = useStyles(className);
  return (
    <html lang="en">
      <AppState>
        <body className={styles('body')}>
          <Header />
          <main className={styles('main')}>
            <div className={styles('wrapper')}>{children}</div>
          </main>
        </body>
      </AppState>
    </html>
  );
}
