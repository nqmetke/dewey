import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Search from '../components/search.js'
import Layout from '../components/layout';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [emoji, setEmoji] = useState("❤️")
  function randomEmojiPicker(){
    let emojis = ["❤️","👽","☕️","📚"]
    let index = Math.floor(Math.random() * emoji.length);
    setEmoji(emojis[index]);
  }



  useEffect(() => {
    randomEmojiPicker();
  },[]);
  return (
    <Layout>
    <div className={styles.container}>
      <Head>
        <title>Dewey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      
      <main>
        <h1 className={styles.title}>Jump into a good book.</h1>
        <h3 className={styles.description}>Then come back here and find your next favorite.</h3>
        <Search />
      </main>

      

      <footer>
        <a
          href="https://nqmetke.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made in CT with {emoji}
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </Layout>
  )
}