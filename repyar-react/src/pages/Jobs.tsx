import { useState } from 'react'
import { Link } from 'react-router-dom'

type JobStatus = 'in-progress' | 'completed' | 'pending' | 'cancelled'

interface Job {
  code: string
  title: string
  vehicleRegistration: string
  status: JobStatus
  stage: { label: string; detail: string; progress: number }
  technician: string
  techInitials: string
  date: string
  c: string
  urgent?: boolean
}

const jobs: Job[] = [
  { code: 'JOB-2041', title: 'Engine overhaul', vehicleRegistration: 'DL1C 3344', status: 'in-progress', stage: { label: 'Stage 5 of 8', detail: 'Engine disassembly in progress', progress: 65 }, technician: 'Rajan Kumar', techInitials: 'RK', date: 'Apr 21, 2026', c: '#4F8EF7' },
  { code: 'JOB-2042', title: 'Transmission fluid flush', vehicleRegistration: 'KA05 AB 1234', status: 'pending', stage: { label: 'Stage 1 of 5', detail: 'Awaiting vehicle drop-off', progress: 0 }, technician: 'Vijay Patil', techInitials: 'VP', date: 'Apr 22, 2026', c: '#3A4055' },
  { code: 'JOB-2039', title: 'Brake inspection & pad replace', vehicleRegistration: 'MH12 9988', status: 'in-progress', stage: { label: 'Stage 7 of 8', detail: 'Pre-delivery inspection', progress: 90 }, technician: 'Arjun Mehta', techInitials: 'AM', date: 'Apr 20, 2026', c: '#22D3A0' },
  { code: 'JOB-2037', title: 'AC & wheel alignment', vehicleRegistration: 'KA01 5566', status: 'in-progress', stage: { label: 'Stage 3 of 6', detail: 'Technician on site', progress: 30 }, technician: 'Sunil Kadam', techInitials: 'SK', date: 'Apr 23, 2026', c: '#F5A623' },
  { code: 'JOB-2033', title: 'Suspension rebuild', vehicleRegistration: 'TN09 7712', status: 'pending', stage: { label: 'Stage 2 of 8', detail: 'Awaiting parts delivery', progress: 20 }, technician: 'Vijay Patil', techInitials: 'VP', date: 'Apr 12, 2026', urgent: true, c: '#F05252' },
  { code: 'JOB-2031', title: 'Routine full service', vehicleRegistration: 'DL01 G 4422', status: 'completed', stage: { label: 'Stage 8 of 8', detail: 'Delivered to customer', progress: 100 }, technician: 'Rajan Kumar', techInitials: 'RK', date: 'Apr 18, 2026', c: '#22D3A0' },
  { code: 'JOB-2028', title: 'Electrical diagnostics', vehicleRegistration: 'MH04 JK 5500', status: 'in-progress', stage: { label: 'Stage 6 of 7', detail: 'Final circuit testing', progress: 85 }, technician: 'Sunil Kadam', techInitials: 'SK', date: 'Apr 20, 2026', c: '#22D3A0' },
]

const statusLabel: Record<JobStatus, string> = {
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'pending': 'Pending',
  'cancelled': 'Cancelled',
}

const statusClass: Record<JobStatus, string> = {
  'in-progress': 's-inservice',
  'completed': 's-operational',
  'pending': 's-pending',
  'cancelled': 's-rejected',
}

const techs = ['All Technicians', 'Rajan Kumar', 'Arjun Mehta', 'Sunil Kadam', 'Vijay Patil']

export default function Jobs() {
  const [activeTech, setActiveTech] = useState('All Technicians')

  const filtered = activeTech === 'All Technicians'
    ? jobs
    : jobs.filter(j => j.technician === activeTech)

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Service Board</div>
        <div className="page-actions">
          <button className="btn">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Schedule
          </button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            New Job
          </button>
        </div>
      </div>

      <div className="filter-row">
        {techs.map(t => (
          <button key={t} className={`filter-btn${activeTech === t ? ' active' : ''}`} onClick={() => setActiveTech(t)}>{t}</button>
        ))}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Vehicle</th>
              <th>Stage</th>
              <th>Progress</th>
              <th>Technician</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(j => (
              <tr key={j.code}>
                <td>
                  <Link to={`/jobs/${j.code}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>{j.code}</div>
                    <div style={{ fontWeight: 500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {j.title}
                      {j.urgent && <span className="chip-urgent">Urgent</span>}
                    </div>
                  </Link>
                </td>
                <td>
                  <span className="jc-plate">{j.vehicleRegistration}</span>
                </td>
                <td>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{j.stage.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{j.stage.detail}</div>
                </td>
                <td style={{ width: 120 }}>
                  <div className="jc-prog-wrap">
                    <div className="jc-prog"><div className="jc-prog-fill" style={{ width: `${j.stage.progress}%`, background: j.c }} /></div>
                    <div className="jc-prog-txt">{j.stage.progress}%</div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div className="tech-av" style={{ color: j.c }}>{j.techInitials}</div>
                    <span style={{ fontSize: 12 }}>{j.technician}</span>
                  </div>
                </td>
                <td><span className={`status-chip ${statusClass[j.status]}`}>{statusLabel[j.status]}</span></td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: j.urgent ? 'var(--red)' : 'var(--text-3)' }}>{j.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
