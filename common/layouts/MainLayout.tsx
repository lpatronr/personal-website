import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  const { pathname } = useRouter();
  // check if pathname starts with post, if it does then remove the characters after the first slash including the slash
  const path = pathname.startsWith('/post/')
    ? pathname.substring(0, pathname.indexOf('/', 1))
    : pathname === '/'
    ? 'home'
    : pathname.substring(1, pathname.length);
  return (
    <div className={styles.main}>
      <div className={styles.flex}>
        <header className={styles.header}>
          <Link href='/'>
            <a className={[styles.mainLink, styles.a].join(' ')}>
              lucas.
              <span className={styles.span}>{path}</span>
            </a>
          </Link>

          <div className={styles.div}>
            <Link href={'/'}>
              <a className={pathname === '/' ? [styles.currentLink, styles.a].join(' ') : styles.a}>
                Home
              </a>
            </Link>
            <Link href={'/about'}>
              <a
                className={
                  pathname === '/about' ? [styles.currentLink, styles.a].join(' ') : styles.a
                }>
                About
              </a>
            </Link>
          </div>
        </header>

        {children}
      </div>

      <footer className={styles.footer}>
        <p>© 2022 Lucas</p>
      </footer>
    </div>
  );
}
