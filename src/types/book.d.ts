interface Book {
  id: string;
  image?: string;
  title: string;
  author: string;
}

type BookStatus = 'reading' | 'completed' | 'planned';

declare global {
  interface Window {
    books: Book[];
  }
}
