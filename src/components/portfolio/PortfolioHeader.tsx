import { Link, NavLink } from 'react-router'
import { ArrowIcon } from '../ui/ArrowIcon'

type PortfolioHeaderProps = {
  name: string
  githubUrl?: string
}

export function PortfolioHeader({ name, githubUrl }: PortfolioHeaderProps) {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 border-b border-line">
      <Link to="/" className="text-[28px] leading-none font-semibold tracking-[-0.07em]" aria-label={name + ' ホーム'}>
        {name}<span className="ml-2 inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3 text-xs" aria-label="メインナビゲーション">
        <NavLink className={({ isActive }) => 'transition-colors hover:text-accent ' + (isActive ? 'font-semibold text-ink' : 'text-muted')} to="/" end>制作実績</NavLink>
        <NavLink className={({ isActive }) => 'transition-colors hover:text-accent ' + (isActive ? 'font-semibold text-ink' : 'text-muted')} to="/about">自己紹介</NavLink>
        {githubUrl && (
          <a className="inline-flex items-center gap-1.5 hover:text-accent" href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub<ArrowIcon className="size-3" /><span className="sr-only">（新しいタブで開きます）</span>
          </a>
        )}
      </nav>
    </header>
  )
}
