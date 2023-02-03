import { createClient } from "@supabase/supabase-js";
import { router } from 'next/router'


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function addBook(book) {
    /**
     * Expected output
     * {
     *  title: 
     *  series:
     *  author:
     *  pub date:
     *  description:
     *  cover:
     *  isbn:
     * }
     */

    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);



   let formattedAuthor = {
        "name": book.authors[0],
        "description": null,
        "website": null,
        "image": null
   }
   let formattedBook = {
        "title": book.title,
        "pub_date": book.publishedDate,
        "rating": null,
        "description": book.description,
        "top_cover": null

   }
   let  formattedEdition = {
        "format": "book",
        "publisher": book.publisher,
        "language": book.language,
        "isbn10": book.industryIdentifiers[1]["identifier"],
        "isbn13": book.industryIdentifiers[0]["identifier"],
        "page_number": book.pageCount,
        "pub_date": book.publishedDate
    }

    if ("imageLinks" in book){
        formattedEdition["cover"] = book.imageLinks.thumbnail.replace("&edge=curl", "")
    }
    // Check to see if ISBN already is in the database
    const editionRes = await supabase
        .from('editions')
        .select()
        .eq('isbn13', formattedEdition.isbn13)
    const editionData = editionRes.data;
    let authorRes = await supabase
        .from('authors')
        .select()
        .eq('name', formattedAuthor.name)
    const authorData = authorRes.data;

    let bookRes = await supabase
        .from('books')
        .select()
        .eq('title', formattedBook.title)

    
    const bookData = bookRes.data

      if(editionData.length < 1){

        if(authorData.length < 1){
            const {authorError} = await supabase
                .from('authors')
                .insert(formattedAuthor)
        }

        if(bookData.length < 1){


            let authorRes2 = await supabase
                .from('authors')
                .select()
                .eq('name', formattedAuthor.name)
            const authorData2 = authorRes2.data;


            formattedBook["author_id"] = authorData2[0].id;
            formattedBook["top_cover"] = formattedEdition["cover"].replace("&edge=curl", "")
            console.log(authorData2[0].id);
            console.log(formattedBook)
            const {bookError} = await supabase
                .from('books')
                .insert(formattedBook)

            let bookResFinal = await supabase
                .from('books')
                .select()
                .eq('title', formattedBook.title)
            formattedEdition["book_id"] = bookResFinal.data[0].id
            


            
            router.push("/book/" + bookResFinal.data[0].id);

            
        }
        else{
            formattedEdition["book_id"] = bookRes.data[0].id
        }

        const {editionError} = await supabase
        .from('editions')
        .insert(formattedEdition);

        
    }
    else{
        router.push("/book/" + bookData[0].id);
    }





    // const {error} = await supabase
    //     .from('editions')
    //     .insert(formattedEdition);
    

} 