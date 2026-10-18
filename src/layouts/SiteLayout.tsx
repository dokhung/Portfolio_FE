import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ArrowIcon } from '../components/ui/ArrowIcon'
import { profile } from '../data/portfolio'

const currentYear = new Date().getFullYear()

export function SiteLayout() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, key])

  return (
    <div id="top" className="mx-auto max-w-[1248px] px-5 sm:px-9 lg:px-12">
      <a className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:bg-ink focus:px-5 focus:py-3 focus:text-paper" href="#main-content">メインコンテンツへスキップ</a>
      <header className="flex min-h-20 items-center justify-between gap-5 border-b border-line">
        <Link to="/" className="text-[28px] leading-none font-semibold tracking-[-0.07em]" aria-label={profile.name + ' ホーム'}>
          {profile.name}<span className="ml-2 inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3 text-xs" aria-label="メインナビゲーション">
          <NavLink className={({ isActive }) => 'transition-colors hover:text-accent ' + (isActive ? 'font-semibold text-ink' : 'text-muted')} to="/" end>制作実績</NavLink>
          <NavLink className={({ isActive }) => 'transition-colors hover:text-accent ' + (isActive ? 'font-semibold text-ink' : 'text-muted')} to="/about">自己紹介</NavLink>
          {profile.githubUrl && (
            <a className="inline-flex items-center gap-1.5 hover:text-accent" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub<ArrowIcon className="size-3" /><span className="sr-only">（新しいタブで開きます）</span>
            </a>
          )}
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-6 text-xs text-muted">
        <p>© {currentYear} {profile.name}</p>
        <div className="flex flex-wrap gap-6">
          {profile.email && <a className="hover:text-ink" href={'mailto:' + profile.email}>メールで連絡</a>}
          <a className="inline-flex items-center gap-2 hover:text-ink" href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </div>
  )
}
