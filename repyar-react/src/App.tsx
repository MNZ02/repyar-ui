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
import Inspections from './pages/Inspections'
import Issues from './pages/Issues'
import Maintenance from './pages/Maintenance'
import JobDetail from './pages/JobDetail'
import VehicleDetail from './pages/VehicleDetail'
import QuotationDetail from './pages/QuotationDetail'
import InvoiceDetail from './pages/InvoiceDetail'
import InspectionDetail from './pages/InspectionDetail'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="fleet/:registration" element={<VehicleDetail />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:code" element={<JobDetail />} />
            <Route path="quotations" element={<Quotations />} />
            <Route path="quotations/:number" element={<QuotationDetail />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:number" element={<InvoiceDetail />} />
            <Route path="spend-analytics" element={<SpendAnalytics />} />
            <Route path="inspections" element={<Inspections />} />
            <Route path="inspections/:id" element={<InspectionDetail />} />
            <Route path="issues" element={<Issues />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
