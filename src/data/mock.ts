import { Paper } from '../types';

export const mockPapers: Paper[] = [
  {
    id: 'paper-001',
    title: '知識蒸留による軽量化モデルの比較研究',
    language: 'ja',
    authors: ['田中 透', '佐藤 優'],
    venue: '情報処理学会論文誌',
    year: 2024,
    tags: ['蒸留', 'モデル圧縮', '推論'],
    status: 'reviewing',
    abstract:
      '軽量化モデルの比較を通して、蒸留手法ごとの精度と推論速度のトレードオフを分析した。',
    overallSummary:
      '蒸留は精度維持に有効だが、教師モデルの選択が推論速度に与える影響が大きい。',
    sections: [
      {
        id: 's-1',
        title: '1. はじめに',
        content:
          '本研究では、複数の蒸留アーキテクチャを比較し、モデル軽量化の実運用に向けた示唆を得る。',
        summary: '蒸留の目的と比較対象を整理している。',
      },
      {
        id: 's-2',
        title: '2. 実験設定',
        content:
          '教師モデルはResNet系列、学生モデルはMobileNet系列を用い、4種の蒸留法で評価した。',
        summary: '教師・学生モデルと蒸留法の組み合わせを定義。',
      },
      {
        id: 's-3',
        title: '3. 結果と考察',
        content:
          '蒸留損失の重みを調整した場合、精度改善が見られる一方で学習安定性が課題となった。',
      },
    ],
    createdAt: '2026-01-02T09:30:00Z',
    updatedAt: '2026-01-20T12:05:00Z',
  },
  {
    id: 'paper-002',
    title: 'Cross-Lingual Retrieval with Contextual Memory',
    language: 'en',
    authors: ['Maya Reed', 'Oliver Chen'],
    venue: 'ACL',
    year: 2025,
    tags: ['retrieval', 'cross-lingual', 'memory'],
    status: 'ready',
    abstract:
      'We propose a contextual memory module that improves cross-lingual document retrieval by aligning semantic spans.',
    translatedAbstract:
      '文脈メモリモジュールにより、意味的スパンの整合を通じてクロスリンガル文書検索を改善する。',
    overallSummary:
      '文脈メモリは言語間の語彙ギャップを緩和し、特に低資源言語で効果が大きい。',
    sections: [
      {
        id: 's-1',
        title: '1. Introduction',
        content:
          'Cross-lingual retrieval suffers from sparse alignment; we address this with contextual memory traces.',
        summary: '課題と提案の位置づけを提示。',
      },
      {
        id: 's-2',
        title: '2. Method',
        content:
          'We encode spans with shared projection heads and store them in a differentiable memory for retrieval.',
        summary: '共有射影と微分可能メモリによる表現を定義。',
      },
      {
        id: 's-3',
        title: '3. Experiments',
        content:
          'Our approach outperforms strong baselines on MLQA and MIRACL benchmarks.',
      },
    ],
    createdAt: '2026-01-05T15:20:00Z',
    updatedAt: '2026-01-25T11:10:00Z',
  },
  {
    id: 'paper-003',
    title: '視線追跡による読解支援UIの評価',
    language: 'ja',
    authors: ['高橋 凛', '川上 凌'],
    venue: 'CHI',
    year: 2025,
    tags: ['HCI', '読解支援', '視線追跡'],
    status: 'draft',
    abstract:
      '視線情報を用いた読解支援UIの有効性を被験者実験により検証した。',
    sections: [
      {
        id: 's-1',
        title: '1. 研究背景',
        content: '読解支援の文脈と視線追跡技術の進展を整理する。',
      },
      {
        id: 's-2',
        title: '2. 実験デザイン',
        content: '30名の参加者に対し、視線誘導UIとベースラインを比較。',
      },
    ],
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-28T09:10:00Z',
  },
];
