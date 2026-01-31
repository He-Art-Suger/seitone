export type PaperLanguage = 'ja' | 'en';

export type PaperStatus = 'draft' | 'reviewing' | 'ready' | 'archived';

export type PaperSection = {
  id: string;
  title: string;
  content: string;
  summary?: string;
};

export type Paper = {
  id: string;
  title: string;
  language: PaperLanguage;
  authors: string[];
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year?: number;
  tags: string[];
  status: PaperStatus;
  abstract: string;
  translatedAbstract?: string;
  overallSummary?: string;
  sections: PaperSection[];
  createdAt: string;
  updatedAt: string;
};
