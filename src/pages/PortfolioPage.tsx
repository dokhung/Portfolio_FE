import { ProjectList } from '../components/projects/ProjectList'
import { profile, projects } from '../data/portfolio'

export function PortfolioPage() {
  return (
    <>
      <section className="flex flex-col justify-between gap-6 py-9 sm:flex-row sm:items-end sm:py-12" aria-labelledby="intro-heading">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs tracking-wider text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />個人制作ポートフォリオ
          </p>
          <h1 id="intro-heading" className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug font-semibold tracking-[-0.035em]">{profile.headline}</h1>
          <p className="mt-4 text-sm leading-[1.9] whitespace-pre-line text-muted">{profile.introduction}</p>
        </div>
        <p className="shrink-0 text-sm text-muted">掲載作品 <span className="ml-2 font-mono text-3xl leading-none text-ink">{String(projects.length).padStart(2, '0')}</span><span className="ml-1 text-xs">件</span></p>
      </section>

      <ProjectList projects={projects} />
    </>
  )
}
