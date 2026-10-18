import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { PortfolioFooter } from '../components/portfolio/PortfolioFooter'
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader'
import { profile } from '../data/portfolio'

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
      <PortfolioHeader name={profile.name} githubUrl={profile.githubUrl} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <PortfolioFooter name={profile.name} email={profile.email} />
    </div>
  )
}
