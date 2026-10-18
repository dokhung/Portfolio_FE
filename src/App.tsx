import { Route, Routes } from 'react-router'
import { ProjectLayout } from './layouts/ProjectLayout'
import { SiteLayout } from './layouts/SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { TodoListPage } from './projects/todo-list/TodoListPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<PortfolioPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<ProjectLayout />}>
        <Route path="projects/todo-list" element={<TodoListPage />} />
      </Route>
    </Routes>
  )
}

export default App
