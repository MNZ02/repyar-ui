import { useState } from 'react'

const quotes = [
  { id: 'Q-0192', title: 'Suspension repair', plate: 'DL1C 3344', amt: '₹28,400', sent: 'Apr 10, 2026', valid: 'Apr 18, 2026', status: 'Pending' },
  { id: 'Q-0189', title: 'Tyre set (4×)', plate: 'MH12 9988', amt: '₹14,800', sent: 'Apr 08, 2026', valid: 'Apr 22, 2026', status: 'Pending' },
  { id: 'Q-0188', title: 'Transmission fluid flush', plate: 'KA05 AB 1234', amt: '₹6,500', sent: 'Apr 07, 2026', valid: 'Apr 14, 2026', status: 'Approved' },
  { id: 'Q-0185', title: 'Full service', plate: 'KA01 5566', amt: '₹9,200', sent: 'Apr 05, 2026', valid: 'Apr 30, 2026', status: 'Pending' },
  { id: 'Q-0182', title: 'Engine overhaul (Stage 1)', plate: 'TN09 7712', amt: '₹85,000', sent: 'Apr 02, 2026', valid: 'Apr 12, 2026', status: 'Rejected' },
  { id: 'Q-0180', title: 'Brake pad replacement', plate: 'DL01 G 4422', amt: '₹4,200', sent: 'Mar 28, 2026', valid: 'Apr 05, 2026', status: 'Approved' },
]

const statusClass: Record<string, string> = { Pending: 's-pending', Approved: 's-approved', Rejected: 's-rejected' }
const filters = ['All Quotes', 'Pending', 'Approved', 'Rejected']

export default function Quotations() {
  const [active, setActive] = useState('All Quotes')

  const filtered = active === 'All Quotes' ? quotes : quotes.filter(q => q.status === active)

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
          <div className="stat-val" style={{ color: 'var(--amber)' }}>5</div>
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
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Date Sent</th>
              <th>Valid Until</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q, i) => (
              <tr key={q.id} style={{ animationDelay: `${i * 40}ms` }}>
                <td>
                  <div className="q-id">{q.id}</div>
                  <div className="q-title-sub">{q.title}</div>
                </td>
                <td>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)' }}>
                    {q.plate}
                  </div>
                </td>
                <td className="q-amt">{q.amt}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{q.sent}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{q.valid}</td>
                <td><span className={`status-chip ${statusClass[q.status]}`}>{q.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  {q.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="q-action ap">Approve</button>
                      <button className="q-action rj">Reject</button>
                    </div>
                  ) : (
                    <button className="q-action">View</button>
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
