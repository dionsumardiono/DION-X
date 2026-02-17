
export enum Category {
  ZAKAT = 'Zakat',
  NIKAH = 'Pernikahan',
  WARIS = 'Waris (Mawarits)',
  EKONOMI = 'Ekonomi Syariah',
  THAHARAH = 'Thaharah (Bersuci)',
  IBADAH = 'Ibadah Harian',
  LAINNYA = 'Lainnya'
}

export interface Consultation {
  id: string;
  category: Category;
  timestamp: number;
  question: string;
  context: Record<string, string>;
  answer?: string;
  status: 'pending' | 'answered' | 'error';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

export interface FormField {
  label: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}
