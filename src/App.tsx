import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { PhaseOnePage } from './pages/PhaseOnePage'
import { SkillTreePage } from './pages/SkillTreePage'
import { QuestPage } from './pages/QuestPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/skills" element={<SkillTreePage />} />
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/achievements" element={<PhaseOnePage />} />
        <Route path="/roadmap" element={<PhaseOnePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
