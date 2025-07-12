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

export interface Question {
  id: number;
  question: string;
  answer: string;
}

declare global {
  interface Window {
    formData: FormData;
  }
}
