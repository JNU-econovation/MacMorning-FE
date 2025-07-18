//이건 홈화면에 나올 대략적인 책의 정보입니다.
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

//이건 책 공유 페이지에 나올 세부적인 책의 정보입니다.
//book을 상속할걸 그랬나요?
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

//story, total_page 제외하고는 전부 null가능
export interface BookPage {
  story_text: string;
  total_page: number;
  image_url: string | null;
  my_choice: number | null;
  first_choice: string | null;
  second_choice: string | null;
  third_choice: string | null;
  is_success: boolean | null;
}

declare global {
  interface Window {
    books: Book[];
  }
}
