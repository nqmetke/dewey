export async function  bookSearch(query) {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=' + query + "&key=")
  .then((response) => response.json())

} 