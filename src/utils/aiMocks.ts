export function mockTranslateToJapanese(text: string): string {
  if (!text.trim()) {
    return '';
  }
  return `【仮訳】${text.slice(0, 140)}${text.length > 140 ? '…' : ''}`;
}

export function mockSummarize(text: string): string {
  if (!text.trim()) {
    return '';
  }
  const trimmed = text.replace(/\s+/g, ' ').trim();
  const slice = trimmed.length > 160 ? `${trimmed.slice(0, 160)}…` : trimmed;
  return `要約: ${slice}`;
}
