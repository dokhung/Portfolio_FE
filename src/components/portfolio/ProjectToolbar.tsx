
import { Link } from 'react-router'
import type { Project } from '../../data/portfolio'
import { ProjectStatusBadge } from './ProjectStatusBadge'

type ProjectToolbarProps = {
    project?: Pick<Project, 'title' | 'status'>
    visible: boolean
    onToggle: () => void
}

export function ProjectToolbar({
                                   project,
                                   visible,
                                   onToggle,
                               }: ProjectToolbarProps) {
    return (
        <div
            className={
                visible
                    ? 'relative z-50 flex min-h-14 shrink-0 items-center gap-3 border-b border-line/50 bg-white/65 px-5 py-1 backdrop-blur-md transition-all duration-200 sm:px-8 lg:px-12'
                    : 'fixed top-3 right-3 z-50 sm:right-5'
            }
        >
            <header
                id="project-toolbar"
                hidden={!visible}
                className={
                    'min-w-0 flex-1 items-center justify-between gap-3 ' +
                    (visible ? 'flex' : 'hidden')
                }
            >
                <Link
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
                    to="/#projects"
                >
                    <span aria-hidden="true">←</span>
                    制作実績の一覧へ
                </Link>

                {project && (
                    <div className="flex min-w-0 items-center gap-2.5">
                        <p
                            className="min-w-0 truncate text-xs font-medium sm:text-sm"
                            title={project.title}
                        >
                            {project.title}
                        </p>
                        <ProjectStatusBadge
                            status={project.status}
                            className="shrink-0"
                        />
                    </div>
                )}
            </header>

            <button
                className={
                    'inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm px-3 text-xs text-muted transition-all duration-200 hover:bg-white/85 hover:text-ink ' +
                    (visible
                        ? ''
                        : 'border border-line/40 bg-white/40 shadow-sm backdrop-blur-sm')
                }
                type="button"
                aria-label={visible ? '上部バーを隠す' : '上部バーを表示'}
                aria-expanded={visible}
                aria-controls="project-toolbar"
                title={visible ? '上部バーを隠す' : '上部バーを表示'}
                onClick={onToggle}
            >
                <svg
                    className="size-3.5 shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path
                        d={visible ? 'm4 10 4-4 4 4' : 'm4 6 4 4 4-4'}
                    />
                </svg>

                <span className={visible ? 'hidden sm:inline' : undefined}>
          {visible ? 'バーを隠す' : 'バーを表示'}
        </span>
            </button>
        </div>
    )
}
