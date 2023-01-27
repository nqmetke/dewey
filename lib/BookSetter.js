import { createClient } from "@supabase/supabase-js";
export {}

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
        "cover": null,
        "isbn10": book.industryIdentifiers[1]["identifier"],
        "isbn13": book.industryIdentifiers[0]["identifier"],
        "page_number": book.pageCount,
        "pub_date": book.publishedDate
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
    console.log(bookData)
      if(editionData.length < 1){
        const {editionError} = await supabase
            .from('editions')
            .insert(formattedEdition);

        if(authorData.length < 1){
            const {authorError} = await supabase
                .from('authors')
                .insert(formattedAuthor)
        }

        if(bookData.length < 1){
            const editionRes2 = await supabase
                .from('editions')
                .select()
                .eq('isbn13', formattedEdition.isbn13)
            const editionData2 = editionRes2.data;
            let authorRes2 = await supabase
                .from('authors')
                .select()
                .eq('name', formattedAuthor.name)
            const authorData2 = authorRes2.data;


            formattedBook["author_id"] = authorData2.id;
            
            
            const {bookError} = await supabase
                .from('books')
                .insert(formattedBook)
        }
        else{
            console.log(bookData);
        }
    }






    // const {error} = await supabase
    //     .from('editions')
    //     .insert(formattedEdition);
    

} 