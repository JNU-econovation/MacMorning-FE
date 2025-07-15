export interface Book {
  book_id: number;
  total_page: number;
  image?: string;
  title: string;
  author: string;
  isLiked: boolean;
  description: string;
}

export type BookStatus = 'reading' | 'completed' | 'planned';

declare global {
  interface Window {
    books: Book[];
  }
}
