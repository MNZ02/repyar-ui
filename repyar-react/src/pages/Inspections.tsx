import { useState } from 'react'
import { Link } from 'react-router-dom'

interface InspectionSummaryItem {
  id: string
  inspectionNumber: string
  jobCode: string
  vehicleRegistration: string
  vehicleMakeModel: string
  status: 'completed' | 'in_progress' | 'pending' | null
  completedAt: string | null
  totalItems: number
  passedItems: number
  failedItems: number
  needsAttentionItems: number
}

const inspections: InspectionSummaryItem[] = [
  { id: 'insp-041', inspectionNumber: 'INS-0041', jobCode: 'JOB-2039', vehicleRegistration: 'MH12 9988', vehicleMakeModel: 'Mahindra Blazo X 35', status: 'completed', completedAt: 'Apr 20, 2026', totalItems: 24, passedItems: 20, failedItems: 2, needsAttentionItems: 2 },
  { id: 'insp-040', inspectionNumber: 'INS-0040', jobCode: 'JOB-2041', vehicleRegistration: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold', status: 'in_progress', completedAt: null, totalItems: 32, passedItems: 14, failedItems: 5, needsAttentionItems: 4 },
  { id: 'insp-038', inspectionNumber: 'INS-0038', jobCode: 'JOB-2031', vehicleRegistration: 'DL01 G 4422', vehicleMakeModel: 'BharatBenz 1923C', status: 'completed', completedAt: 'Apr 18, 2026', totalItems: 20, passedItems: 19, failedItems: 0, needsAttentionItems: 1 },
  { id: 'insp-035', inspectionNumber: 'INS-0035', jobCode: 'JOB-2037', vehicleRegistration: 'KA01 5566', vehicleMakeModel: 'Ashok Leyland Dost+', status: 'in_progress', completedAt: null, totalItems: 28, passedItems: 10, failedItems: 3, needsAttentionItems: 5 },
  { id: 'insp-033', inspectionNumber: 'INS-0033', jobCode: 'JOB-2028', vehicleRegistration: 'MH04 JK 5500', vehicleMakeModel: 'Mahindra Furio 14', status: 'completed', completedAt: 'Apr 19, 2026', totalItems: 22, passedItems: 17, failedItems: 3, needsAttentionItems: 2 },
  { id: 'insp-030', inspectionNumber: 'INS-0030', jobCode: 'JOB-2033', vehicleRegistration: 'TN09 7712', vehicleMakeModel: 'Eicher Pro 2049', status: 'pending', completedAt: null, totalItems: 32, passedItems: 0, failedItems: 0, needsAttentionItems: 0 },
]

const statusClass: Record<string, string> = {
  completed: 's-approved',
  in_progress: 's-inservice',
  pending: 's-pending',
}

const statusLabel: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  pending: 'Pending',
}

const filters = ['All', 'Completed', 'In Progress', 'Pending']

function matchesFilter(status: string | null, filter: string) {
  if (filter === 'All') return true
  if (filter === 'Completed') return status === 'completed'
  if (filter === 'In Progress') return status === 'in_progress'
  if (filter === 'Pending') return status === 'pending' || status === null
  return true
}

export default function Inspections() {
  const [active, setActive] = useState('All')

  const filtered = inspections.filter(i => matchesFilter(i.status, active))

  const totalCompleted = inspections.filter(i => i.status === 'completed').length
  const totalFailed = inspections.reduce((s, i) => s + i.failedItems, 0)
  const totalAttention = inspections.reduce((s, i) => s + i.needsAttentionItems, 0)

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Inspection Reports</div>
        <div className="page-actions">
          <button className="btn">Export</button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            New Inspection
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Total Reports</div>
          <div className="stat-val">{inspections.length}</div>
          <div className="stat-sub">{totalCompleted} completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Failed Items</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>{totalFailed}</div>
          <div className="stat-sub">Across all reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Needs Attention</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>{totalAttention}</div>
          <div className="stat-sub">Across all reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Pass Rate</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>82%</div>
          <div className="stat-sub">Avg across fleet</div>
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
              <th>Report No.</th>
              <th>Job · Vehicle</th>
              <th>Date</th>
              <th>Results</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const passRate = item.totalItems > 0 ? Math.round((item.passedItems / item.totalItems) * 100) : 0
              return (
                <tr key={item.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <td>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 600, color: 'var(--text-1)' }}>{item.inspectionNumber}</div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)' }}>{item.vehicleRegistration}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{item.vehicleMakeModel} · {item.jobCode}</div>
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'DM Mono, monospace' }}>{item.completedAt ?? 'Ongoing'}</td>
                  <td>
                    {item.totalItems > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', gap: 4, height: 4, borderRadius: 2, overflow: 'hidden', width: 120, background: 'var(--border)' }}>
                          <div style={{ width: `${passRate}%`, background: 'var(--green)', height: '100%' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, fontSize: 10, fontFamily: 'DM Mono, monospace' }}>
                          <span style={{ color: 'var(--green)' }}>✓ {item.passedItems}</span>
                          {item.failedItems > 0 && <span style={{ color: 'var(--red)' }}>✗ {item.failedItems}</span>}
                          {item.needsAttentionItems > 0 && <span style={{ color: 'var(--amber)' }}>! {item.needsAttentionItems}</span>}
                          <span style={{ color: 'var(--text-3)' }}>{passRate}%</span>
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Not started</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-chip ${statusClass[item.status ?? 'pending']}`}>
                      {statusLabel[item.status ?? 'pending']}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/inspections/${item.id}`} className="q-action" style={{ textDecoration: 'none' }}>View Report</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
