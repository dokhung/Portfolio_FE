export const categories = ['すべて', 'Webサイト', 'アプリ', 'その他'] as const

export type Category = (typeof categories)[number]

export type ProjectStatus = '制作中' | '公開中' | '制作完了'

export type Project = {
  id: string
  title: string
  description: string
  category: Exclude<Category, 'すべて'>
  role: string
  tags: string[]
  period: string
  status: ProjectStatus
  url?: string
  repositoryUrl?: string
  image?: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'ポートフォリオサイト',
    description:
      '制作物を一覧で紹介するポートフォリオサイトです。各プロジェクトの概要・担当範囲・使用技術・関連リンクを整理しています。',
    category: 'Webサイト',
    role: '画面設計・フロントエンド実装',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    period: '2026年10月〜',
    status: '制作中',
    highlights: ['画面幅に応じたレスポンシブ表示', 'カテゴリーによるプロジェクトの絞り込み'],
  },
]

export const profile = {
  name: 'odo.',
  headline: '制作プロジェクト',
  introduction:
    '制作物の概要・担当範囲・使用技術をまとめています。\n公開中の作品には、サイトやソースコードへのリンクを掲載します。',
  about: '',
  email: '',
  githubUrl: '',
}
