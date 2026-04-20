import { useState } from 'react'

interface Job {
  id: string; title: string; plate: string; col: string; prog: number
  tech: string; techName: string; due: string; c: string; urgent?: boolean
}

const jobs: Job[] = [
  { id: 'JOB-2041', title: 'Engine overhaul', plate: 'DL1C 3344', col: 'in-progress', prog: 65, tech: 'RK', techName: 'Rajan K.', due: 'Tomorrow', c: '#4F8EF7' },
  { id: 'JOB-2042', title: 'Transmission fluid flush', plate: 'KA05 AB 1234', col: 'todo', prog: 0, tech: 'VP', techName: 'Vijay P.', due: 'Apr 14', c: '#3A4055' },
  { id: 'JOB-2039', title: 'Brake inspection & pad replace', plate: 'MH12 9988', col: 'review', prog: 90, tech: 'AM', techName: 'Arjun M.', due: 'Today', c: '#22D3A0' },
  { id: 'JOB-2037', title: 'AC & wheel alignment', plate: 'KA01 5566', col: 'in-progress', prog: 30, tech: 'SK', techName: 'Sunil K.', due: 'Apr 15', c: '#F5A623' },
  { id: 'JOB-2033', title: 'Suspension rebuild', plate: 'TN09 7712', col: 'todo', prog: 45, tech: 'VP', techName: 'Vijay P.', due: 'Overdue', urgent: true, c: '#F05252' },
  { id: 'JOB-2031', title: 'Routine full service', plate: 'DL01 G 4422', col: 'done', prog: 100, tech: 'RK', techName: 'Rajan K.', due: 'Done', c: '#22D3A0' },
  { id: 'JOB-2028', title: 'Electrical diagnostics', plate: 'MH04 JK 5500', col: 'review', prog: 85, tech: 'SK', techName: 'Sunil K.', due: 'Today', c: '#22D3A0' },
]

const cols = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review & QA' },
  { id: 'done', title: 'Done' },
]

const techs = ['All Technicians', 'Rajan K.', 'Arjun M.', 'Sunil K.']

export default function Jobs() {
  const [activeTech, setActiveTech] = useState('All Technicians')

  const filtered = activeTech === 'All Technicians'
    ? jobs
    : jobs.filter(j => j.techName === activeTech)

  return (
    <div className="content" style={{ overflow: 'hidden' }}>
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

      <div className="kanban-board">
        {cols.map(col => {
          const colJobs = filtered.filter(j => j.col === col.id)
          return (
            <div className="kanban-col" key={col.id}>
              <div className="k-head">
                {col.title} <span className="k-count">{colJobs.length}</span>
              </div>
              <div className="k-cards">
                {colJobs.map((j, i) => (
                  <div className="job-card" key={j.id} style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="jc-top">
                      <div>
                        <div className="jc-id">{j.id}</div>
                        <div className="jc-title">{j.title}</div>
                      </div>
                      {j.urgent && <span className="chip-urgent">Urgent</span>}
                    </div>
                    <span className="jc-plate">{j.plate}</span>
                    <div className="jc-prog-wrap">
                      <div className="jc-prog"><div className="jc-prog-fill" style={{ width: `${j.prog}%`, background: j.c }} /></div>
                      <div className="jc-prog-txt">{j.prog}%</div>
                    </div>
                    <div className="jc-foot">
                      <div className="jc-tech">
                        <div className="tech-av" style={{ color: j.c }}>{j.tech}</div>
                        {j.techName}
                      </div>
                      <div className="jc-due" style={{ color: j.urgent ? 'var(--red)' : 'var(--text-3)' }}>{j.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
