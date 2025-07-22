export interface FormData {
  genre: string[];
  gameMode: boolean;
  title: string;
  story: {
    grammatical_person: string;
    historical_background: string;
    plot: string;
  };
  character: {
    name: string;
    gender: string;
    age: string;
    description: string;
  };
}

export interface Illust {
  illust_id: number;
  story_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  choice_id: number;
}

declare global {
  interface Window {
    formData: FormData;
  }
}
