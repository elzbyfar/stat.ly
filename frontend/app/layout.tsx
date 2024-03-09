import type { Metadata } from 'next';
import { Theme, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css';
import useStyles from './hooks/useStyles';
import AppState from './context/AppState';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'Statly',
  description:
    'Statly is a modern web application for tracking and visualizing NBA player statistics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = {
    main: 'flex min-h-screen flex-col items-center py-24 gap-y-8 mx-auto',
    wrapper:
      'bg-white shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] w-[1200px] rounded-lg',
    body: 'bg-gradient-to-r from-yellow-500/10 to-rose-500/10 w-full',
  };

  const styles = useStyles(className);

  return (
    <html lang="en">
      <body className={styles('body')}>
        <Theme accentColor="orange" radius="large">
          <AppState>
            <Header />
            <main className={styles('main')}>
              <Container className={styles('wrapper')}>{children}</Container>
            </main>
          </AppState>
        </Theme>
      </body>
    </html>
  );
}
