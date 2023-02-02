import { useRouter } from 'next/router'
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Search(props){
    const { id } = useRouter()
    

      return (
        <div>Hello, {id}</div>
    )
}