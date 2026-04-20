import { useState } from 'react'

type ScheduleStatus = 'Overdue' | 'Due Soon' | 'Upcoming'
type ScheduleType = 'Insurance' | 'Compliance' | 'Maintenance'

interface ServiceSchedule {
  id: string
  title: string
  vehicleRegistration: string
  vehicleMakeModel: string
  dueDate: string
  status: ScheduleStatus
  type: ScheduleType
}

const schedules: ServiceSchedule[] = [
  { id: 'sch-01', title: 'PUC Certificate Renewal', vehicleRegistration: 'KA05 AB 1234', vehicleMakeModel: 'Tata Prima 5530.S', dueDate: 'Apr 17, 2026', status: 'Overdue', type: 'Compliance' },
  { id: 'sch-02', title: 'Periodic Service', vehicleRegistration: 'TN09 7712', vehicleMakeModel: 'Eicher Pro 2049', dueDate: 'Apr 05, 2026', status: 'Overdue', type: 'Maintenance' },
  { id: 'sch-03', title: 'Insurance Renewal', vehicleRegistration: 'MH12 9988', vehicleMakeModel: 'Mahindra Blazo X 35', dueDate: 'Apr 25, 2026', status: 'Due Soon', type: 'Insurance' },
  { id: 'sch-04', title: 'Periodic Service', vehicleRegistration: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold', dueDate: 'Apr 25, 2026', status: 'Due Soon', type: 'Maintenance' },
  { id: 'sch-05', title: 'Periodic Service', vehicleRegistration: 'MH04 JK 5500', vehicleMakeModel: 'Mahindra Furio 14', dueDate: 'Apr 25, 2026', status: 'Due Soon', type: 'Maintenance' },
  { id: 'sch-06', title: 'Fitness Certificate (FC)', vehicleRegistration: 'KA01 5566', vehicleMakeModel: 'Ashok Leyland Dost+', dueDate: 'May 01, 2026', status: 'Upcoming', type: 'Compliance' },
  { id: 'sch-07', title: 'Insurance Renewal', vehicleRegistration: 'DL01 G 4422', vehicleMakeModel: 'BharatBenz 1923C', dueDate: 'May 12, 2026', status: 'Upcoming', type: 'Insurance' },
  { id: 'sch-08', title: 'Periodic Service', vehicleRegistration: 'DL01 G 4422', vehicleMakeModel: 'BharatBenz 1923C', dueDate: 'May 20, 2026', status: 'Upcoming', type: 'Maintenance' },
  { id: 'sch-09', title: 'Annual Service & Oil Change', vehicleRegistration: 'MH12 9988', vehicleMakeModel: 'Mahindra Blazo X 35', dueDate: 'May 15, 2026', status: 'Upcoming', type: 'Maintenance' },
  { id: 'sch-10', title: 'Periodic Service', vehicleRegistration: 'KA05 AB 1234', vehicleMakeModel: 'Tata Prima 5530.S', dueDate: 'Jun 10, 2026', status: 'Upcoming', type: 'Maintenance' },
  { id: 'sch-11', title: 'Periodic Service', vehicleRegistration: 'KA03 M 9001', vehicleMakeModel: 'Tata Winger Cargo', dueDate: 'Jun 15, 2026', status: 'Upcoming', type: 'Maintenance' },
  { id: 'sch-12', title: 'PUC Certificate Renewal', vehicleRegistration: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold', dueDate: 'Jun 20, 2026', status: 'Upcoming', type: 'Compliance' },
]

const statusClass: Record<ScheduleStatus, string> = {
  Overdue: 's-overdue', 'Due Soon': 's-pending', Upcoming: 's-approved'
}

const typeClass: Record<ScheduleType, string> = {
  Insurance: 'chip chip-p', Compliance: 'chip chip-n', Maintenance: 'chip chip-a'
}

const filters = ['All', 'Overdue', 'Due Soon', 'Upcoming']
const typeFilters = ['All Types', 'Insurance', 'Compliance', 'Maintenance']

export default function Maintenance() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All Types')

  const filtered = schedules.filter(s => {
    const statusMatch = statusFilter === 'All' || s.status === statusFilter
    const typeMatch = typeFilter === 'All Types' || s.type === typeFilter
    return statusMatch && typeMatch
  })

  const overdue = schedules.filter(s => s.status === 'Overdue').length
  const dueSoon = schedules.filter(s => s.status === 'Due Soon').length
  const upcoming = schedules.filter(s => s.status === 'Upcoming').length

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Maintenance Planner</div>
        <div className="page-actions">
          <button className="btn">Export</button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Add Schedule
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Overdue</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>{overdue}</div>
          <div className="stat-sub">Immediate action needed</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Due Soon</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>{dueSoon}</div>
          <div className="stat-sub">Within 7 days</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Upcoming</div>
          <div className="stat-val">{upcoming}</div>
          <div className="stat-sub">Scheduled ahead</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Total Scheduled</div>
          <div className="stat-val">{schedules.length}</div>
          <div className="stat-sub">Across {new Set(schedules.map(s => s.vehicleRegistration)).size} vehicles</div>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn${statusFilter === f ? ' active' : ''}`} onClick={() => setStatusFilter(f)}
            style={f === 'Overdue' && statusFilter !== f ? { color: 'var(--red)' } : {}}>
            {f}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {typeFilters.map(f => (
            <button key={f} className={`filter-btn${typeFilter === f ? ' active' : ''}`} onClick={() => setTypeFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Schedule</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{ animationDelay: `${i * 40}ms` }}>
                <td>
                  <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-1)' }}>{s.title}</div>
                </td>
                <td>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', border: '1px solid var(--border)' }}>{s.vehicleRegistration}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{s.vehicleMakeModel}</div>
                </td>
                <td><span className={typeClass[s.type]}>{s.type}</span></td>
                <td style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: s.status === 'Overdue' ? 'var(--red)' : s.status === 'Due Soon' ? 'var(--amber)' : 'var(--text-2)' }}>
                  {s.dueDate}
                </td>
                <td><span className={`status-chip ${statusClass[s.status]}`}>{s.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {(s.status === 'Overdue' || s.status === 'Due Soon') && (
                      <button className="q-action ap">Schedule</button>
                    )}
                    <button className="q-action">View</button>
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
