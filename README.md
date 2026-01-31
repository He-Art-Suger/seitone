# seitone

論文の翻訳・要約・整理を一つのDBとして保存し、研究ノートの閲覧性と管理性を高めるモバイルアプリ。

## 目的
- **論文DBの一元化**: 和訳・要約・章ごとのメモを同一カードに集約
- **言語チャンネル**: 日本語/英語を切り替えながら閲覧・編集
- **自動処理の導線**: 翻訳・要約の実行を画面内で完結
- **典型機能**: 認証、同期、設定画面を備えたアプリ構成

## UI/UX 設計意図
- **読みやすさ優先**: 章ごとの要約カード、タグ、ステータスで情報を整理
- **操作の一貫性**: 主要アクションは丸型ボタンで統一し、右上に配置
- **空間の温度感**: 紙面と研究ノートを連想させる淡いグラデーション背景
- **チャンネル切替**: 日本語/英語を切り替えるセグメントUIを常時表示

## 画面構成
1. **Sign In / Sign Up**: Firebase 認証を想定したログイン/登録
2. **Library**: 言語チャンネル切替・検索・論文カード一覧
3. **Paper Detail**: 翻訳・全体要約・章要約の閲覧と生成
4. **Paper Edit**: 章ごとの要約・本文の編集
5. **Settings**: 同期状況、API設定、ログアウト

## 機能要件への対応
- 条件①: 論文DBの管理をカード/UIとタグで整理し、検索と編集導線を用意
- 条件②: 日本語/英語チャンネル切替、英語論文に翻訳ボタンを配置
- 条件③: 全体・章ごとの自動要約ボタンを用意（`aiMocks.ts` で仮実装）
- 条件④: 認証・設定・同期の典型機能を搭載
- 条件⑤: このREADMEで設計の意図と構成をまとめ

## データ設計（Firestore 想定）
### `papers` コレクション
```
papers/{paperId}
  title: string
  language: 'ja' | 'en'
  authors: string[]
  venue: string
  year: number
  tags: string[]
  status: 'draft' | 'reviewing' | 'ready' | 'archived'
  abstract: string
  translatedAbstract?: string
  overallSummary?: string
  sections: [{ id, title, content, summary? }]
  createdAt: ISO string
  updatedAt: ISO string
```

## AI連携の想定
- **翻訳**: 英語 `abstract` を日本語に変換 → `translatedAbstract`
- **全体要約**: abstract + 章本文をまとめて要約 → `overallSummary`
- **章要約**: 章ごとの `content` を要約 → `sections[n].summary`
- 実装の入口は `src/utils/aiMocks.ts`。将来的に Cloud Functions / 外部API に置換。

## Firebase 設定
1. `src/services/firebase.ts` の `firebaseConfig` を実値で置換
2. Firestore と Authentication を有効化
3. 認証はメール/パスワードを前提に実装

## 開発コマンド
```
npm install
npm run start
```

## 今後の拡張候補
- 章テンプレートの自動生成（IMRAD）
- AI要約の履歴管理、比較ビュー
- PDFアップロードと全文抽出
- チーム共有 / コメント / 共同編集
