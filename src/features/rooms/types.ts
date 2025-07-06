export interface Participant {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  index: number;
  language: string;
  leader: string;
  participants: Participant[];
}