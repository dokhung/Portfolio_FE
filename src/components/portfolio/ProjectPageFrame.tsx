import type { ReactNode } from 'react'

type ProjectPageFrameProps = {
  children: ReactNode
}

export function ProjectPageFrame({ children }: ProjectPageFrameProps) {
  return (
    <div className="flex w-full flex-1 flex-col">
      {children}
    </div>
  )
}
