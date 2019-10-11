export default class Book {
  constructor(
    title = '',
    subtitle = '',
    author = '',
    pages = '',
    readPages = 0,
    reading = false,
    read = false,
    favorite = false
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;
    this.reading = reading;
    this.read = read;
    this.favorite = favorite;
  }
}