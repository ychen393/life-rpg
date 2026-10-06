import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { SkillTreePage } from './pages/SkillTreePage'
import { QuestPage } from './pages/QuestPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/skills" element={<SkillTreePage />} />
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/achievements" element={<ComingSoonPage variant="achievements" />} />
        <Route path="/roadmap" element={<ComingSoonPage variant="roadmap" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
