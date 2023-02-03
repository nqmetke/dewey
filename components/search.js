import styles from '../styles/Search.module.css';
import { bookSearch } from '../lib/BookGetter';
import { addBook } from '../lib/BookSetter';
import { useState } from 'react';
import {Image} from 'next/image';
import {Link} from 'next/link';

export default function Search(){
    const [query, setQuery] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [bookCoverList, setBookCoverList] = useState([]);
    const bookListView = bookList.map((book)=> <div className="bookListEntry">
        <div className="bookInfo">
        <h3>{book.title}</h3> 
        <h5>{book.authors[0]}</h5>
        </div>
        <hr></hr>
        </div>);

    function handleSearchChange(e){
        setQuery(e.target.value);
        if(showMenu) {
            setBookList([]);
            setBookCoverList([]);
            setShowMenu(false);
        }


    }
    
    async function  bookNavigate(e, book){
        e.preventDefault();
        await addBook(book);

    }

    function handleKeyPress (event)  {
        if(event.key === 'Enter'){
          setShowMenu(true)
          
            
    
          bookSearch(query).then(res => {
            setBookList(res.items.map((item)=>{
                let isbn13

                
                console.log(isbn13)
                console.log({
                    "title": item.volumeInfo.title,
                    "authors": item.volumeInfo.authors,
                    "volumeInfo": item.volumeInfo,
                })
                return {
                    "title": item.volumeInfo.title,
                    "authors": item.volumeInfo.authors,
                    "volumeInfo": item.volumeInfo,
                }
            }))

          })
        }
      }


      return (
        <div className={styles.vert_container}>
            <div className={styles.container}>
                <input onKeyDown={handleKeyPress} value={query} onChange={handleSearchChange} className={styles.searchbar} placeholder='Search Books'></input>
                <button onClick={(e)=>{e.preventDefault(); bookSearch(e,query)}} className={styles.searchbutton}>Search</button>
                
            </div>
            {showMenu && (bookListView.length > 0) ? 
            <div className={styles.results}>
            
            {bookList.map((book)=> 
                
                <a onClick={(e)=>bookNavigate(e, book.volumeInfo)} href="/" className={styles.bookMenu}>
                    <div className={styles.bookListEntry}>
                        {"imageLinks" in book.volumeInfo ? (
                                <img src={book.volumeInfo.imageLinks.thumbnail.replace("&edge=curl", "")}></img>
                        ): null}
                        <div className={styles.bookInfo}>
                            <h2>{book.title}</h2> 
                            <h3>{book.authors[0]}</h3>
                        </div>
                    </div>
                    </a>)}
                
             
             </div>
             : null}
        </div>
    )
}