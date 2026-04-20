import { useState } from 'react'
import { Link } from 'react-router-dom'

type QuotationDisplayStatus = 'pending' | 'approved' | 'rejected' | 'draft'

interface QuotationSummary {
  quotationNumber: string
  title: string
  vehicleReg: string
  jobCode: string
  totalAmount: number
  createdAt: string
  validUntil: string | null
  status: QuotationDisplayStatus
}

const quotes: QuotationSummary[] = [
  { quotationNumber: 'Q-0192', title: 'Suspension repair', vehicleReg: 'DL1C 3344', jobCode: 'JOB-2041', totalAmount: 2840000, createdAt: 'Apr 10, 2026', validUntil: 'Apr 25, 2026', status: 'pending' },
  { quotationNumber: 'Q-0189', title: 'Tyre set (4×)', vehicleReg: 'MH12 9988', jobCode: 'JOB-2039', totalAmount: 1480000, createdAt: 'Apr 08, 2026', validUntil: 'Apr 28, 2026', status: 'pending' },
  { quotationNumber: 'Q-0188', title: 'Transmission fluid flush', vehicleReg: 'KA05 AB 1234', jobCode: 'JOB-2042', totalAmount: 650000, createdAt: 'Apr 07, 2026', validUntil: 'Apr 21, 2026', status: 'approved' },
  { quotationNumber: 'Q-0185', title: 'Full service — Stage 2', vehicleReg: 'KA01 5566', jobCode: 'JOB-2037', totalAmount: 920000, createdAt: 'Apr 05, 2026', validUntil: 'Apr 30, 2026', status: 'pending' },
  { quotationNumber: 'Q-0182', title: 'Engine overhaul — Stage 1', vehicleReg: 'TN09 7712', jobCode: 'JOB-2033', totalAmount: 8500000, createdAt: 'Apr 02, 2026', validUntil: 'Apr 16, 2026', status: 'rejected' },
  { quotationNumber: 'Q-0180', title: 'Brake pad replacement', vehicleReg: 'DL01 G 4422', jobCode: 'JOB-2031', totalAmount: 420000, createdAt: 'Mar 28, 2026', validUntil: 'Apr 11, 2026', status: 'approved' },
]

function formatAmount(paise: number) {
  const rupees = paise / 100
  return '₹' + rupees.toLocaleString('en-IN')
}

const statusClass: Record<QuotationDisplayStatus, string> = {
  pending: 's-pending', approved: 's-approved', rejected: 's-rejected', draft: 's-draft'
}

const statusLabel: Record<QuotationDisplayStatus, string> = {
  pending: 'Pending', approved: 'Approved', rejected: 'Rejected', draft: 'Draft'
}

const filters = ['All Quotes', 'Pending', 'Approved', 'Rejected']

export default function Quotations() {
  const [active, setActive] = useState('All Quotes')

  const filtered = active === 'All Quotes'
    ? quotes
    : quotes.filter(q => q.status === active.toLowerCase())

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">All Quotations</div>
        <div className="page-actions">
          <button className="btn">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Export
          </button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Create Quote
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Pending Approval</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>3</div>
          <div className="stat-sub">₹1.24L potential</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Approved (Apr)</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>18</div>
          <div className="stat-sub">₹4.12L secured</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Rejected</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>3</div>
          <div className="stat-sub">Needs review</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Conversion Rate</div>
          <div className="stat-val">85%</div>
          <div className="stat-sub">+2% from Mar</div>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Quote Info</th>
              <th>Job · Vehicle</th>
              <th>Amount</th>
              <th>Created</th>
              <th>Valid Until</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q, i) => (
              <tr key={q.quotationNumber} style={{ animationDelay: `${i * 40}ms` }}>
                <td>
                  <div className="q-id">{q.quotationNumber}</div>
                  <div className="q-title-sub">{q.title}</div>
                </td>
                <td>
                  <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--text-2)' }}>{q.jobCode}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)', marginTop: 2 }}>
                    {q.vehicleReg}
                  </div>
                </td>
                <td className="q-amt">{formatAmount(q.totalAmount)}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{q.createdAt}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{q.validUntil ?? '—'}</td>
                <td><span className={`status-chip ${statusClass[q.status]}`}>{statusLabel[q.status]}</span></td>
                <td style={{ textAlign: 'right' }}>
                  {q.status === 'pending' ? (
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="q-action ap">Approve</button>
                      <button className="q-action rj">Reject</button>
                    </div>
                  ) : (
                    <Link to={`/quotations/${q.quotationNumber}`} className="q-action" style={{ textDecoration: 'none' }}>View</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
