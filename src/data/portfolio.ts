export const categories = ['すべて', 'Webサイト', 'アプリ', 'その他'] as const

export type Category = (typeof categories)[number]

export type ProjectStatus = '企画中' | '制作中' | '公開中' | '制作完了'

export type Project = {
  id: string
  title: string
  description: string
  category: Exclude<Category, 'すべて'>
  role: string
  tags: string[]
  period: string
  status: ProjectStatus
  path?: string
  url?: string
  repositoryUrl?: string
  image?: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: 'todo-list',
    title: 'ToDoリスト',
    description:
      'タスクを管理するToDoリストを企画しています。現在は制作内容の検討と、作品ページの準備を進めています。',
    category: 'アプリ',
    role: '企画・画面設計',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    period: '未定',
    status: '企画中',
    path: '/projects/todo-list',
  },
]

export const profile = {
  name: 'odo.',
  headline: '制作プロジェクト',
  introduction:
    '制作物の概要・担当範囲・使用技術をまとめています。\n作品名や「作品を開く」から、制作したページをご覧いただけます。',
  about: '',
  email: '',
  githubUrl: '',
}
