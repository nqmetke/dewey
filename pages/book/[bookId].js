import  Layout  from '../../components/layout'
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/Book.module.css'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function getServerSideProps(context) {

  console.log(context)
  const {bookId} = context.query

  let bookRes = await supabase
    .from('books')
    .select()
    .eq('id', bookId)

   const book = bookRes.data[0]

  return {
    props: {
      book
    },
  }
}
export default function Book(props){


    const [book, setBook] = useState(props.book)
    const [author, setAuthor] = useState(props.author)
    const [editionList, setEditions] = useState(props.editionList)



      return (
        <Layout>
          <div className={utilStyles.contentContainer}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <img src={book.top_cover.replace("&edge=curl", "")}></img>
            <p>{book.description}</p>
          </div>


        </Layout>
    )
}