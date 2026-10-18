import { useState } from 'react'
import { categories } from '../../data/portfolio'
import type { Category, Project } from '../../data/portfolio'
import { ProjectCard } from './ProjectCard'

type ProjectListProps = {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [category, setCategory] = useState<Category>('すべて')
  const visibleProjects = category === 'すべて' ? projects : projects.filter((project) => project.category === category)
  const availableCategories = categories.filter((item) => item === 'すべて' || projects.some((project) => project.category === item))

  return (
    <section id="projects" className="scroll-mt-6 border-t border-line pb-12" aria-labelledby="projects-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7">
        <h2 id="projects-heading" className="text-base font-semibold">プロジェクト一覧</h2>
        {projects.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="プロジェクトの種類で絞り込み">
            {availableCategories.map((item) => {
              const count = item === 'すべて' ? projects.length : projects.filter((project) => project.category === item).length
              return (
                <button
                  className={'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-xs transition-colors ' + (category === item ? 'border-ink bg-ink text-paper' : 'border-line text-muted hover:border-ink hover:text-ink')}
                  key={item}
                  type="button"
                  aria-label={item + '、' + count + '件'}
                  aria-pressed={category === item}
                  aria-controls="project-list"
                  onClick={() => setCategory(item)}
                >
                  {item}<span className="font-mono text-[10px]" aria-hidden="true">{count}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{category}：{visibleProjects.length}件のプロジェクト</p>
      <ol id="project-list" className="mt-4 border-t border-line">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
      </ol>
      {visibleProjects.length === 0 && (
        <p className="border-b border-line py-14 text-center text-sm leading-relaxed text-muted">掲載するプロジェクトを準備しています。</p>
      )}
    </section>
  )
}
