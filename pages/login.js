import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from '../styles/Login.module.css'
import Account from '../components/Account'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Login(){
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <Layout login>
        {!session ? (
            <div className={styles.login}>
              <div className={styles.login_form}>
              <h2>Login to Dewey</h2>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" />
              </div>
            </div>
          ) : (
            <div>
              <Account session={session} />
            </div>
          )}

          <Link href="/">Return Home</Link>
        </Layout>
    )
}