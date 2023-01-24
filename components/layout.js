import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export const siteTitle = "Dewey"


export default function Layout({ children, home, login }){
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href='/favicon.ico' />
                <meta
                    name='description'
                    content="Dewey: A Digital Reading Journal"
                />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    
      <div className={styles.navbar}>
        <div className={styles.left_align}>
          <Link href="/" className={styles.title}>Dewey</Link>
        </div>
        <div class={styles.right_align}>
        {!session ? 
            !login ? (
              <Link className={styles.button} href="/login">Login</Link>
              ) : null
         : (
            <Link className={styles.button} href="/login">Profile</Link>
        )}
        </div>
      </div>

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}