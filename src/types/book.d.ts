export interface Book {
  book_id: number;
  total_page: number;
  title_img_url?: string;
  title: string;
  author: string;
  isLiked: boolean;
  description: string;
  is_in_progress?: boolean | null; //be에서 null 반환하면 안되는데 왜 null로 반환이 오죠..? 일단 임시 땜빵용 null
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
