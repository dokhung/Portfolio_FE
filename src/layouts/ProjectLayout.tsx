import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ProjectPageFrame } from '../components/portfolio/ProjectPageFrame'
import { ProjectToolbar } from '../components/portfolio/ProjectToolbar'
import { projects } from '../data/portfolio'

export function ProjectLayout() {
  const { pathname } = useLocation()
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)
  const project = projects.find(({ path }) => path && (pathname === path || pathname.startsWith(path + '/')))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      <a className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:bg-ink focus:px-5 focus:py-3 focus:text-paper" href="#project-content">
        作品のメインコンテンツへスキップ
      </a>
      <ProjectToolbar project={project} visible={isToolbarVisible} onToggle={() => setIsToolbarVisible((visible) => !visible)} />
      <main id="project-content" aria-label={project?.title} tabIndex={-1} className="flex w-full flex-1 flex-col focus:outline-none">
        <ProjectPageFrame>
          <Outlet />
        </ProjectPageFrame>
      </main>
    </div>
  )
}
