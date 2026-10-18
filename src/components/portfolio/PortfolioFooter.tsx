type PortfolioFooterProps = {
  name: string
  email?: string
}

const currentYear = new Date().getFullYear()

export function PortfolioFooter({ name, email }: PortfolioFooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-6 text-xs text-muted">
      <p>© {currentYear} {name}</p>
      <div className="flex flex-wrap gap-6">
        {email && <a className="hover:text-ink" href={'mailto:' + email}>メールで連絡</a>}
        <a className="inline-flex items-center gap-2 hover:text-ink" href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}
