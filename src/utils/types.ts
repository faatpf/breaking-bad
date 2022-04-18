export type Characters = {
  appearance: Array<number>;
  better_call_saul_appearance: [];
  birthday: string;
  category: string;
  char_id: number;
  img: string;
  name: string;
  nickname: string;
  occupation: Array<string>;
  portrayed: string;
  status: string;
};

export type CharacterQuote = {
  author: string;
  quote: string;
  quote_id: number;
  series: string;
};

export type ErrorDTO = {
  code?: number;
  message?: string;
  uri?: string;
  severity?: "Fatal" | "Error" | "Warning";
};
