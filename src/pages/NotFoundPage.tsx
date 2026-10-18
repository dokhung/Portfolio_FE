import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="not-found-heading">
      <p className="mb-3 font-mono text-sm text-accent">404</p>
      <h1 id="not-found-heading" className="text-2xl leading-relaxed font-semibold sm:text-3xl">ページが見つかりませんでした</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">URLが正しいかご確認ください。</p>
      <Link className="mt-7 inline-flex min-h-11 items-center rounded-sm bg-ink px-5 py-3 text-sm text-paper hover:bg-accent" to="/">制作実績へ戻る</Link>
    </section>
  )
}
