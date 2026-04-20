import { useState } from 'react'
import { Link } from 'react-router-dom'

type InvoiceStatus = 'draft' | 'pending' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled' | 'refunded'

interface InvoiceSummary {
  invoiceNumber: string
  jobCode: string
  vehicleReg: string
  title: string
  totalAmount: number
  paidAmount: number
  balanceAmount: number
  issuedAt: string | null
  dueDate: string | null
  status: InvoiceStatus
}

const invoices: InvoiceSummary[] = [
  { invoiceNumber: 'INV-4091', jobCode: 'JOB-2033', vehicleReg: 'TN09 7712', title: 'Suspension rebuild', totalAmount: 4200000, paidAmount: 0, balanceAmount: 4200000, issuedAt: 'Apr 02, 2026', dueDate: 'Apr 09, 2026', status: 'overdue' },
  { invoiceNumber: 'INV-4088', jobCode: 'JOB-2041', vehicleReg: 'DL1C 3344', title: 'Engine overhaul', totalAmount: 12000000, paidAmount: 0, balanceAmount: 12000000, issuedAt: 'Apr 05, 2026', dueDate: 'Apr 20, 2026', status: 'sent' },
  { invoiceNumber: 'INV-4085', jobCode: 'JOB-2039', vehicleReg: 'MH12 9988', title: 'Brake inspection & pad replace', totalAmount: 1450000, paidAmount: 0, balanceAmount: 1450000, issuedAt: 'Apr 08, 2026', dueDate: 'Apr 23, 2026', status: 'sent' },
  { invoiceNumber: 'INV-4082', jobCode: 'JOB-2031', vehicleReg: 'DL01 G 4422', title: 'Routine full service', totalAmount: 920000, paidAmount: 920000, balanceAmount: 0, issuedAt: 'Mar 28, 2026', dueDate: 'Apr 12, 2026', status: 'paid' },
  { invoiceNumber: 'INV-4079', jobCode: 'JOB-2028', vehicleReg: 'MH04 JK 5500', title: 'Electrical diagnostics', totalAmount: 600000, paidAmount: 0, balanceAmount: 600000, issuedAt: 'Mar 25, 2026', dueDate: 'Apr 08, 2026', status: 'overdue' },
  { invoiceNumber: 'INV-4075', jobCode: 'JOB-2042', vehicleReg: 'KA05 AB 1234', title: 'Transmission fluid flush', totalAmount: 650000, paidAmount: 650000, balanceAmount: 0, issuedAt: 'Mar 20, 2026', dueDate: 'Apr 04, 2026', status: 'paid' },
]

function formatAmount(paise: number) {
  const rupees = paise / 100
  return '₹' + rupees.toLocaleString('en-IN')
}

const statusLabel: Record<string, string> = {
  sent: 'Unpaid', paid: 'Paid', overdue: 'Overdue', partially_paid: 'Partial'
}

const statusClass: Record<string, string> = {
  sent: 's-unpaid', paid: 's-paid', overdue: 's-overdue', partially_paid: 's-unpaid'
}

const filters = ['All Invoices', 'Unpaid', 'Paid', 'Overdue']

function matchesFilter(status: InvoiceStatus, filter: string) {
  if (filter === 'Unpaid') return status === 'sent' || status === 'pending'
  if (filter === 'Paid') return status === 'paid'
  if (filter === 'Overdue') return status === 'overdue'
  return true
}

export default function Invoices() {
  const [active, setActive] = useState('All Invoices')

  const filtered = active === 'All Invoices'
    ? invoices
    : invoices.filter(i => matchesFilter(i.status, active))

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">All Invoices</div>
        <div className="page-actions">
          <button className="btn">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Export CSV
          </button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            New Invoice
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Outstanding</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>₹3.2L</div>
          <div className="stat-sub">Across 14 invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Overdue</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>₹48K</div>
          <div className="stat-sub">Across 2 invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Collected (Apr)</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>₹2.1L</div>
          <div className="stat-sub">Across 32 invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Collection Rate</div>
          <div className="stat-val">78%</div>
          <div className="stat-sub">Target: 85%</div>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn${active === f ? ' active' : ''}`}
            style={f === 'Overdue' && active !== f ? { color: 'var(--red)' } : {}}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Invoice Info</th>
              <th>Job · Vehicle</th>
              <th>Total</th>
              <th>Balance Due</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, idx) => (
              <tr key={inv.invoiceNumber} style={{ animationDelay: `${idx * 40}ms` }}>
                <td>
                  <div className="i-id">{inv.invoiceNumber}</div>
                  <div className="i-title">{inv.title}</div>
                </td>
                <td>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text-2)' }}>{inv.jobCode}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)', marginTop: 2 }}>
                    {inv.vehicleReg}
                  </div>
                </td>
                <td className="i-amt">{formatAmount(inv.totalAmount)}</td>
                <td className="i-amt" style={{ color: inv.status === 'overdue' ? 'var(--red)' : inv.status === 'paid' ? 'var(--green)' : 'inherit' }}>
                  {inv.status === 'paid' ? '—' : formatAmount(inv.balanceAmount)}
                </td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{inv.issuedAt ?? '—'}</td>
                <td style={{ fontSize: 11, color: inv.status === 'overdue' ? 'var(--red)' : 'var(--text-2)' }}>{inv.dueDate ?? '—'}</td>
                <td><span className={`status-chip ${statusClass[inv.status] ?? ''}`}>{statusLabel[inv.status] ?? inv.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {inv.status !== 'paid' && (
                      <button className="i-action" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-dim)' }}>Remind</button>
                    )}
                    <Link to={`/invoices/${inv.invoiceNumber}`} className="i-action" style={{ textDecoration: 'none' }}>View</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
