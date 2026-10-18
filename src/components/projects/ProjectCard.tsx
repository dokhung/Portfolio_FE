import type { Project, ProjectStatus } from '../../data/portfolio'
import { ArrowIcon } from '../ui/ArrowIcon'

const statusStyles: Record<ProjectStatus, string> = {
  制作中: 'border-[#e9d5b6] bg-[#f7efdf] text-[#79602e]',
  公開中: 'border-[#cad9cb] bg-[#eaf0e8] text-[#415e42]',
  制作完了: 'border-line bg-white/50 text-muted',
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLinks = Boolean(project.url || project.repositoryUrl)

  return (
    <li className="border-b border-line py-7 sm:py-8">
      <article className="grid gap-5 lg:grid-cols-[28px_minmax(0,1fr)_160px] lg:gap-7">
        <span className="hidden pt-1.5 font-mono text-xs text-muted lg:block" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <div className="flex flex-col gap-5 sm:flex-row">
            {project.image && (
              <img
                className="aspect-[8/5] w-full shrink-0 rounded-sm border border-line object-cover sm:h-24 sm:w-38"
                src={project.image}
                alt={project.title + 'の画面'}
                width="320"
                height="200"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="min-w-0">
              <p className="mb-2 text-xs text-muted">{project.category}</p>
              <h3 className="text-xl leading-snug font-semibold tracking-[-0.025em] sm:text-2xl">{project.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-[1.9] text-muted [overflow-wrap:anywhere]">{project.description}</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-x-7 gap-y-5 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_0.75fr]">
            <div>
              <dt className="text-xs text-muted">担当範囲</dt>
              <dd className="mt-2 text-[13px] leading-relaxed [overflow-wrap:anywhere]">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">使用技術</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li className="rounded-sm border border-line px-2 py-1 font-mono text-[11px] leading-tight [overflow-wrap:anywhere]" key={tag}>{tag}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">制作期間</dt>
              <dd className="mt-2 text-[13px] leading-relaxed">{project.period}</dd>
            </div>
          </dl>

          {Boolean(project.highlights?.length) && (
            <div className="mt-5">
              <h4 className="text-xs text-muted">主な実装</h4>
              <ul className="mt-2 flex flex-col gap-1.5 text-[13px] leading-relaxed">
                {project.highlights?.map((highlight) => (
                  <li className="flex gap-2.5" key={highlight}>
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                    <span className="[overflow-wrap:anywhere]">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-stretch">
          <span className={'inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] lg:mb-2 lg:self-end ' + statusStyles[project.status]}>
            {project.status}
          </span>
          {hasLinks && (
            <div className="flex flex-wrap gap-2 lg:flex-col" role="group" aria-label={project.title + 'のリンク'}>
              {project.url && (
                <a className="inline-flex min-h-11 items-center justify-between gap-4 rounded-sm bg-ink px-4 py-2.5 text-xs text-paper transition-colors hover:bg-accent" href={project.url} target="_blank" rel="noopener noreferrer">
                  サイトを見る<ArrowIcon /><span className="sr-only">（新しいタブで開きます）</span>
                </a>
              )}
              {project.repositoryUrl && (
                <a className="inline-flex min-h-11 items-center justify-between gap-4 rounded-sm border border-line px-4 py-2.5 text-xs transition-colors hover:border-ink" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                  ソースコード<ArrowIcon /><span className="sr-only">（新しいタブで開きます）</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </li>
  )
}
