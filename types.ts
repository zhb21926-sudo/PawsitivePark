
export interface Pillar {
  id: number;
  title: string;
  crisis: string;
  infrastructure: string;
  legal: string;
  educational: string;
  image: string;
  icon: string;
}

export interface Signature {
  id: string;
  name: string;
  timestamp: Date;
  location?: string;
  comment?: string;
}
