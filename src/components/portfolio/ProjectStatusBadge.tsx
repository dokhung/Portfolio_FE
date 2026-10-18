import type { ProjectStatus } from '../../data/portfolio'

const statusStyles: Record<ProjectStatus, string> = {
  企画中: 'border-line bg-white/50 text-muted',
  制作中: 'border-[#e9d5b6] bg-[#f7efdf] text-[#79602e]',
  公開中: 'border-[#cad9cb] bg-[#eaf0e8] text-[#415e42]',
  制作完了: 'border-line bg-white/50 text-muted',
}

export function ProjectStatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={'inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] ' + statusStyles[status] + ' ' + className}>
      {status}
    </span>
  )
}
