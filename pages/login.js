import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Layout from '../components/layout'
import Link from 'next/link'
export default function Login(){
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <Layout home>
        {!session ? (
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" />
          ) : (
            <Account session={session} />
          )}

          <Link href="/">Return Home</Link>
        </Layout>
    )
}