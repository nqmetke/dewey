export default async function getData(query) {
    fetch("https://www.googleapis.com/books/v1/volumes?q="+query+"&key"+process.env.GOOGLE_ENV)
     .then(response => response())
     .then(response => console.log(response.data))
     .catch(err => console.log(err))
}