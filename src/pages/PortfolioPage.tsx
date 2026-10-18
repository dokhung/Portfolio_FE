import { PortfolioIntro } from '../components/portfolio/PortfolioIntro'
import { ProjectList } from '../components/portfolio/ProjectList'
import { profile, projects } from '../data/portfolio'

export function PortfolioPage() {
  return (
    <>
      <PortfolioIntro headline={profile.headline} introduction={profile.introduction} projectCount={projects.length} />
      <ProjectList projects={projects} />
    </>
  )
}
