import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Fleet from './pages/Fleet'
import Jobs from './pages/Jobs'
import Invoices from './pages/Invoices'
import Quotations from './pages/Quotations'
import Settings from './pages/Settings'
import SpendAnalytics from './pages/SpendAnalytics'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="quotations" element={<Quotations />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="spend-analytics" element={<SpendAnalytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
