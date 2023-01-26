import { createClient } from "@supabase/supabase-js";

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


    const formattedEdition = {
        "isbn13": book.industryIdentifiers[0]["ISBN_13"],
        "isbn10": book.industryIdentifiers[1]["ISBN_10"],
        "publisher": book.publisher,
        "language": book.language,
        "page_number": book.pageCount
    }

    const {error} = await supabase
        .from('editions')
        .insert(formattedEdition);
    

} 