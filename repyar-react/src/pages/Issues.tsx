import { useState } from 'react'

type IssueSeverity = 'High' | 'Medium' | 'Low'
type IssueStatus = 'open' | 'in_progress' | 'resolved'

interface FleetIssue {
  id: string
  title: string
  description: string
  severity: IssueSeverity
  status: IssueStatus
  jobCode: string
  vehicleRegistration: string
  vehicleMakeModel: string
  flaggedAt: string
  partsNeeded?: string[]
}

const issues: FleetIssue[] = [
  {
    id: 'iss-041', title: 'Cracked engine mount', description: 'Front-right engine mount shows stress fracture. Vibration at idle above 900 RPM. Immediate replacement required.',
    severity: 'High', status: 'in_progress', jobCode: 'JOB-2041', vehicleRegistration: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold',
    flaggedAt: 'Apr 10, 2026', partsNeeded: ['Engine mount bracket', 'Mounting bolts M12×1.75']
  },
  {
    id: 'iss-040', title: 'Rear leaf spring fatigue', description: 'Rear suspension leaf spring shows fatigue cracking on 3rd leaf. Ride height reduced by ~15 mm. Vehicle overloading suspected.',
    severity: 'High', status: 'open', jobCode: 'JOB-2033', vehicleRegistration: 'TN09 7712', vehicleMakeModel: 'Eicher Pro 2049',
    flaggedAt: 'Apr 02, 2026', partsNeeded: ['Rear leaf spring assembly', 'U-bolts', 'Spring shackle pins']
  },
  {
    id: 'iss-038', title: 'Wiring harness insulation damage', description: 'Main cabin harness shows heat-damage insulation near firewall. Risk of short circuit. Root cause: exhaust proximity.',
    severity: 'High', status: 'in_progress', jobCode: 'JOB-2028', vehicleRegistration: 'MH04 JK 5500', vehicleMakeModel: 'Mahindra Furio 14',
    flaggedAt: 'Mar 25, 2026', partsNeeded: ['Wiring harness loom', 'Heat-resistant sleeve']
  },
  {
    id: 'iss-036', title: 'AC compressor bearing noise', description: 'AC compressor emits grinding noise during operation. Clutch bearing worn. System functional but risk of failure.',
    severity: 'Medium', status: 'open', jobCode: 'JOB-2037', vehicleRegistration: 'KA01 5566', vehicleMakeModel: 'Ashok Leyland Dost+',
    flaggedAt: 'Apr 05, 2026', partsNeeded: ['Compressor clutch bearing', 'Compressor belt']
  },
  {
    id: 'iss-034', title: 'Worn front brake pads', description: 'Front axle brake pad thickness at 2 mm — below 3 mm service limit. Brake performance degraded on slopes.',
    severity: 'Medium', status: 'in_progress', jobCode: 'JOB-2039', vehicleRegistration: 'MH12 9988', vehicleMakeModel: 'Mahindra Blazo X 35',
    flaggedAt: 'Apr 08, 2026', partsNeeded: ['Front brake pad set', 'Brake dust shields']
  },
  {
    id: 'iss-031', title: 'PUC certificate expired', description: 'Pollution Under Control certificate expired on Apr 17, 2026. Vehicle must not be operated on public roads.',
    severity: 'Low', status: 'open', jobCode: '', vehicleRegistration: 'KA05 AB 1234', vehicleMakeModel: 'Tata Prima 5530.S',
    flaggedAt: 'Apr 17, 2026'
  },
  {
    id: 'iss-029', title: 'Minor differential oil seep', description: 'Rear differential shows trace oil seep at output shaft seal. Not urgent — monitor at next service.',
    severity: 'Low', status: 'resolved', jobCode: 'JOB-2031', vehicleRegistration: 'DL01 G 4422', vehicleMakeModel: 'BharatBenz 1923C',
    flaggedAt: 'Mar 20, 2026'
  },
]

const severityClass: Record<IssueSeverity, string> = {
  High: 'chip chip-r', Medium: 'chip chip-a', Low: 'chip chip-n'
}

const statusClass: Record<IssueStatus, string> = {
  open: 's-pending', in_progress: 's-inservice', resolved: 's-approved'
}

const statusLabel: Record<IssueStatus, string> = {
  open: 'Open', in_progress: 'In Progress', resolved: 'Resolved'
}

const filters = ['All Issues', 'Open', 'In Progress', 'Resolved']
const severityFilters = ['All Severity', 'High', 'Medium', 'Low']

export default function Issues() {
  const [statusFilter, setStatusFilter] = useState('All Issues')
  const [severityFilter, setSeverityFilter] = useState('All Severity')

  const filtered = issues.filter(i => {
    const statusMatch = statusFilter === 'All Issues' || statusLabel[i.status] === statusFilter
    const severityMatch = severityFilter === 'All Severity' || i.severity === severityFilter
    return statusMatch && severityMatch
  })

  const openHigh = issues.filter(i => i.status !== 'resolved' && i.severity === 'High').length
  const openMedium = issues.filter(i => i.status !== 'resolved' && i.severity === 'Medium').length
  const openLow = issues.filter(i => i.status !== 'resolved' && i.severity === 'Low').length

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Issues & Alerts</div>
        <div className="page-actions">
          <button className="btn">Export</button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Flag Issue
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">High Severity</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>{openHigh}</div>
          <div className="stat-sub">Require immediate action</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Medium Severity</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>{openMedium}</div>
          <div className="stat-sub">Monitor closely</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Low Severity</div>
          <div className="stat-val" style={{ color: 'var(--text-2)' }}>{openLow}</div>
          <div className="stat-sub">Track at next service</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Resolved (Apr)</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>{issues.filter(i => i.status === 'resolved').length}</div>
          <div className="stat-sub">Closed this month</div>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn${statusFilter === f ? ' active' : ''}`} onClick={() => setStatusFilter(f)}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {severityFilters.map(f => (
            <button key={f} className={`filter-btn${severityFilter === f ? ' active' : ''}`} onClick={() => setSeverityFilter(f)}
              style={f === 'High' && severityFilter !== f ? { color: 'var(--red)' } : f === 'Medium' && severityFilter !== f ? { color: 'var(--amber)' } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((issue, i) => (
          <div key={issue.id} className="card" style={{ padding: '14px 18px', animationDelay: `${i * 40}ms` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span className={severityClass[issue.severity]}>{issue.severity}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>{issue.title}</span>
                  {issue.status !== 'resolved' && issue.severity === 'High' && (
                    <span className="chip-urgent">Urgent</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 8 }}>{issue.description}</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text-1)' }}>
                    {issue.vehicleRegistration}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{issue.vehicleMakeModel}</span>
                  {issue.jobCode && (
                    <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--accent)' }}>{issue.jobCode}</span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Flagged {issue.flaggedAt}</span>
                </div>
                {issue.partsNeeded && issue.partsNeeded.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Parts needed:</span>
                    {issue.partsNeeded.map(p => (
                      <span key={p} style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', background: 'var(--bg-hover)', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: 3, color: 'var(--text-2)' }}>{p}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, minWidth: 100 }}>
                <span className={`status-chip ${statusClass[issue.status]}`}>{statusLabel[issue.status]}</span>
                <button className="q-action">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
