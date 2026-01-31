type BibFields = {
  title?: string;
  authors?: string[];
  year?: string;
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  abstract?: string;
  keywords?: string[];
};

const fieldMap: Record<string, keyof BibFields> = {
  title: 'title',
  year: 'year',
  journal: 'venue',
  booktitle: 'venue',
  volume: 'volume',
  number: 'issue',
  pages: 'pages',
  abstract: 'abstract',
  keywords: 'keywords',
};

const normalizeValue = (value: string) =>
  value.replace(/^{|}$/g, '').replace(/["{}]/g, '').trim();

const parseAuthors = (value: string) => {
  const raw = normalizeValue(value);
  if (!raw) {
    return [];
  }
  return raw.split(/\s+and\s+/i).map((item) => item.trim()).filter(Boolean);
};

const parseKeywords = (value: string) => {
  const raw = normalizeValue(value);
  if (!raw) {
    return [];
  }
  return raw.split(/[,;]/).map((item) => item.trim()).filter(Boolean);
};

export const parseBibtex = (input: string): BibFields => {
  const result: BibFields = {};
  const bodyMatch = input.match(/@\w+\s*{\s*[^,]+,(.*)}\s*$/s);
  const body = bodyMatch ? bodyMatch[1] : input;

  const fieldRegex = /(\w+)\s*=\s*({[^}]*}|\"[^\"]*\"|[^,\n]+)\s*,?/g;
  let match: RegExpExecArray | null;

  while ((match = fieldRegex.exec(body))) {
    const key = match[1].toLowerCase();
    const value = match[2];
    if (key === 'author') {
      const authors = parseAuthors(value);
      if (authors.length) {
        result.authors = authors;
      }
      continue;
    }
    if (key === 'keywords') {
      const keywords = parseKeywords(value);
      if (keywords.length) {
        result.keywords = keywords;
      }
      continue;
    }
    const mapped = fieldMap[key];
    if (mapped) {
      const normalized = normalizeValue(value);
      if (normalized) {
        result[mapped] = normalized;
      }
    }
  }

  return result;
};
