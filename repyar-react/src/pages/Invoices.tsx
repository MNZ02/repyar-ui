import { useState } from 'react'

const invoices = [
  { id: 'INV-4091', title: 'Suspension rebuild', plate: 'TN09 7712', amt: '₹42,000', issued: 'Apr 02, 2026', due: 'Apr 09, 2026', status: 'Overdue' },
  { id: 'INV-4088', title: 'Engine overhaul', plate: 'DL1C 3344', amt: '₹1,20,000', issued: 'Apr 05, 2026', due: 'Apr 20, 2026', status: 'Unpaid' },
  { id: 'INV-4085', title: 'Brake inspection & pad replace', plate: 'MH12 9988', amt: '₹14,500', issued: 'Apr 08, 2026', due: 'Apr 23, 2026', status: 'Unpaid' },
  { id: 'INV-4082', title: 'Routine full service', plate: 'DL01 G 4422', amt: '₹9,200', issued: 'Mar 28, 2026', due: 'Apr 12, 2026', status: 'Paid' },
  { id: 'INV-4079', title: 'Electrical diagnostics', plate: 'MH04 JK 5500', amt: '₹6,000', issued: 'Mar 25, 2026', due: 'Apr 08, 2026', status: 'Overdue' },
  { id: 'INV-4075', title: 'Transmission fluid flush', plate: 'KA05 AB 1234', amt: '₹6,500', issued: 'Mar 20, 2026', due: 'Apr 04, 2026', status: 'Paid' },
]

const statusClass: Record<string, string> = { Unpaid: 's-unpaid', Paid: 's-paid', Overdue: 's-overdue' }
const filters = ['All Invoices', 'Unpaid', 'Paid', 'Overdue']

export default function Invoices() {
  const [active, setActive] = useState('All Invoices')

  const filtered = active === 'All Invoices' ? invoices : invoices.filter(i => i.status === active)

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
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, idx) => (
              <tr key={inv.id} style={{ animationDelay: `${idx * 40}ms` }}>
                <td>
                  <div className="i-id">{inv.id}</div>
                  <div className="i-title">{inv.title}</div>
                </td>
                <td>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)' }}>
                    {inv.plate}
                  </div>
                </td>
                <td className="i-amt">{inv.amt}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)' }}>{inv.issued}</td>
                <td style={{ fontSize: 11, color: inv.status === 'Overdue' ? 'var(--red)' : 'var(--text-2)' }}>{inv.due}</td>
                <td><span className={`status-chip ${statusClass[inv.status]}`}>{inv.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {inv.status !== 'Paid' && (
                      <button className="i-action" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-dim)' }}>Remind</button>
                    )}
                    <button className="i-action">PDF</button>
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
