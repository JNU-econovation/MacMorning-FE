export interface Book {
  book_id: number;
  total_page: number;
  title_img_url?: string;
  title: string;
  author: string;
  isLiked: boolean;
  description: string;
}

export type BookStatus = 'reading' | 'completed' | 'planned';
interface Character {
  grammatical_person?: string;
  historical_background?: string;
  name?: string;
  age?: string;
  gender?: string;
  characteristic?: string;
}

export interface BookDetail {
  book_id: number;
  title_img_url: string;
  title: string;
  author: string;
  background?: string;
  is_bookmarked?: boolean;
  character: Character;
  genre: string[];
  created_at: string;
}



declare global {
  interface Window {
    books: Book[];
  }
}
