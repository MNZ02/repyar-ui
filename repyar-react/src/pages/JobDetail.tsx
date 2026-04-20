import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { JobDetail } from '../types/job'

const mockJobs: Record<string, JobDetail> = {
  'JOB-2041': {
    job: { id: 'j-2041', code: 'JOB-2041', title: 'Engine overhaul', createdAt: 'Apr 5, 2026', statusPill: 'in-progress' },
    vehicle: { registration: 'DL1C 3344', makeModel: 'Tata Ace Gold', year: '2021', fuelType: 'Diesel', lastServiceDue: 'Apr 25, 2026' },
    stage: { label: 'Stage 5 of 8', detail: 'Engine disassembly in progress', progress: 65 },
    technician: { name: 'Rajan Kumar', rating: '4.9', jobs: '24' },
    quotes: [
      { id: 'q-192', code: 'Q-0192', title: 'Suspension repair + engine mount', amount: '₹28,400', status: 'pending', items: [{ description: 'Engine mount bracket', qty: 1, rate: 4200, total: 4200 }, { description: 'Labour — engine disassembly', qty: 8, rate: 850, total: 6800 }, { description: 'Gasket & seals set', qty: 1, rate: 2800, total: 2800 }] },
    ],
    issues: [
      { id: 'iss-041', title: 'Cracked engine mount', description: 'Front-right engine mount shows stress fracture. Vibration at idle above 900 RPM.', severity: 'High', flaggedAt: 'Apr 10, 2026', partsNeeded: ['Engine mount bracket', 'Mounting bolts M12×1.75'] },
      { id: 'iss-040b', title: 'Oil pan gasket seep', description: 'Trace oil seep visible at oil pan gasket. Non-critical — replacing during overhaul.', severity: 'Low', flaggedAt: 'Apr 12, 2026' },
    ],
    timeline: [
      { id: 't1', icon: 'green', title: 'Job created', time: 'Apr 5, 2026 · 09:00 AM' },
      { id: 't2', icon: 'accent', title: 'Vehicle checked in', time: 'Apr 6, 2026 · 11:30 AM' },
      { id: 't3', icon: 'accent', title: 'Initial inspection completed — INS-0040', time: 'Apr 7, 2026 · 02:15 PM' },
      { id: 't4', icon: 'amber', title: 'Q-0192 sent for approval', time: 'Apr 10, 2026 · 04:00 PM' },
      { id: 't5', icon: 'amber', title: 'Parts ordered — 3 items', time: 'Apr 13, 2026 · 10:00 AM' },
      { id: 't6', icon: 'accent', title: 'Engine disassembly started', time: 'Apr 15, 2026 · 09:30 AM' },
    ],
    inspectionPhotos: [{ id: 'ip1', label: 'Engine bay — front view' }, { id: 'ip2', label: 'Cracked engine mount' }, { id: 'ip3', label: 'Oil pan underside' }],
    inspectionReport: null,
    documents: [
      { id: 'doc1', title: 'INV-4088', subtitle: 'Engine overhaul · ₹1,20,000', status: 'unpaid', amount: '₹1,20,000' },
    ],
    commonIssues: [
      { id: 'ci1', issue: 'Engine mount wear', frequency: 'Every 18 mo', recommendation: 'Inspect mounts at each service' },
      { id: 'ci2', issue: 'Coolant top-up', frequency: 'Every 6 mo', recommendation: 'Check coolant level monthly' },
    ],
    schedules: [
      { id: 'sch-4', title: 'Periodic Service', dueDate: 'Apr 25, 2026', status: 'Due Soon' },
    ],
  },
  'JOB-2039': {
    job: { id: 'j-2039', code: 'JOB-2039', title: 'Brake inspection & pad replace', createdAt: 'Apr 8, 2026', statusPill: 'in-progress' },
    vehicle: { registration: 'MH12 9988', makeModel: 'Mahindra Blazo X 35', year: '2022', fuelType: 'Diesel', lastServiceDue: 'May 15, 2026' },
    stage: { label: 'Stage 7 of 8', detail: 'Pre-delivery inspection', progress: 90 },
    technician: { name: 'Arjun Mehta', rating: '4.6', jobs: '19' },
    quotes: [
      { id: 'q-189', code: 'Q-0189', title: 'Tyre set (4×) + brake pads', amount: '₹14,800', status: 'pending', items: [{ description: 'Front brake pad set', qty: 1, rate: 3200, total: 3200 }, { description: 'Brake dust shields', qty: 2, rate: 600, total: 1200 }, { description: 'Labour — brake service', qty: 4, rate: 850, total: 3400 }] },
    ],
    issues: [
      { id: 'iss-034', title: 'Worn front brake pads', description: 'Front axle brake pad thickness at 2 mm — below 3 mm service limit.', severity: 'Medium', flaggedAt: 'Apr 8, 2026', partsNeeded: ['Front brake pad set', 'Brake dust shields'] },
    ],
    timeline: [
      { id: 't1', icon: 'green', title: 'Job created', time: 'Apr 8, 2026 · 08:00 AM' },
      { id: 't2', icon: 'accent', title: 'Vehicle checked in', time: 'Apr 8, 2026 · 10:00 AM' },
      { id: 't3', icon: 'accent', title: 'Inspection completed — INS-0041', time: 'Apr 9, 2026 · 01:00 PM' },
      { id: 't4', icon: 'amber', title: 'Q-0189 sent for approval', time: 'Apr 9, 2026 · 03:30 PM' },
      { id: 't5', icon: 'accent', title: 'Brake pad replacement completed', time: 'Apr 19, 2026 · 11:00 AM' },
      { id: 't6', icon: 'green', title: 'Pre-delivery inspection started', time: 'Apr 20, 2026 · 09:00 AM' },
    ],
    inspectionPhotos: [{ id: 'ip1', label: 'Front brake assembly' }, { id: 'ip2', label: 'New brake pads installed' }],
    inspectionReport: null,
    documents: [{ id: 'doc1', title: 'INV-4085', subtitle: 'Brake service · ₹14,500', status: 'unpaid', amount: '₹14,500' }],
    commonIssues: [{ id: 'ci1', issue: 'Brake fade under load', frequency: 'Every 12 mo', recommendation: 'Use OEM pads for heavy-duty operation' }],
    schedules: [{ id: 'sch-9', title: 'Annual Service', dueDate: 'May 15, 2026', status: 'Upcoming' }],
  },
}

const statusPillClass: Record<string, string> = {
  'in-progress': 's-inservice', completed: 's-approved', pending: 's-pending', cancelled: 's-rejected'
}

const severityClass: Record<string, string> = { High: 'chip chip-r', Medium: 'chip chip-a', Low: 'chip chip-n' }
const quoteStatusClass: Record<string, string> = { pending: 's-pending', approved: 's-approved', rejected: 's-rejected' }
const iconColor: Record<string, string> = { green: 'var(--green)', accent: 'var(--accent)', amber: 'var(--amber)', red: 'var(--red)' }

type Tab = 'overview' | 'issues' | 'timeline' | 'documents'

export default function JobDetail() {
  const { code } = useParams<{ code: string }>()
  const [tab, setTab] = useState<Tab>('overview')
  const data = mockJobs[code ?? '']

  if (!data) {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)' }}>
          <div style={{ fontSize: 14 }}>Job not found: {code}</div>
          <Link to="/jobs" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>← Back to Jobs</Link>
        </div>
      </div>
    )
  }

  const { job, vehicle, stage, technician, quotes, issues, timeline, documents, schedules } = data

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <Link to="/jobs" style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}>← Jobs</Link>
          <div className="page-title" style={{ marginTop: 4 }}>{job.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, fontFamily: 'DM Mono, monospace' }}>
            {job.code} · {vehicle.registration} · {vehicle.makeModel} · Created {job.createdAt}
          </div>
        </div>
        <div className="page-actions">
          <span className={`status-chip ${statusPillClass[job.statusPill]}`} style={{ fontSize: 11 }}>{job.statusPill.replace('-', ' ')}</span>
          <button className="btn prim">Close Job</button>
        </div>
      </div>

      {/* Stage progress */}
      <div className="card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>{stage.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{stage.detail}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'DM Mono, monospace', color: 'var(--accent)' }}>{stage.progress}%</div>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${stage.progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 3, transition: 'width .4s' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14 }}>
        {/* Main */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
            {(['overview', 'issues', 'timeline', 'documents'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', fontSize: 12, fontWeight: tab === t ? 600 : 400, color: tab === t ? 'var(--accent)' : 'var(--text-2)', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', textTransform: 'capitalize' }}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Vehicle info */}
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Vehicle</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[['Registration', vehicle.registration], ['Make & Model', vehicle.makeModel], ['Year', vehicle.year], ['Fuel', vehicle.fuelType], ['Next Service', vehicle.lastServiceDue]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{l}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-1)', fontFamily: l === 'Registration' ? 'DM Mono, monospace' : 'inherit', marginTop: 1 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Quotes */}
              {quotes.map(q => (
                <div key={q.id} className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--text-2)' }}>{q.code}</span>
                      <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>{q.title}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>{q.amount}</span>
                      <span className={`status-chip ${quoteStatusClass[q.status]}`}>{q.status}</span>
                    </div>
                  </div>
                  {q.items && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                      <thead><tr style={{ borderBottom: '1px solid var(--border)' }}><th style={{ textAlign: 'left', padding: '4px 0', color: 'var(--text-3)', fontWeight: 500 }}>Item</th><th style={{ textAlign: 'right', padding: '4px 0', color: 'var(--text-3)', fontWeight: 500 }}>Qty</th><th style={{ textAlign: 'right', padding: '4px 0', color: 'var(--text-3)', fontWeight: 500 }}>Rate</th><th style={{ textAlign: 'right', padding: '4px 0', color: 'var(--text-3)', fontWeight: 500 }}>Total</th></tr></thead>
                      <tbody>
                        {q.items.map((item, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '6px 0', color: 'var(--text-1)' }}>{item.description}</td>
                            <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{item.qty}</td>
                            <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>₹{item.rate.toLocaleString('en-IN')}</td>
                            <td style={{ textAlign: 'right', color: 'var(--text-1)', fontWeight: 600 }}>₹{item.total.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'issues' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {issues.length === 0 && <div style={{ color: 'var(--text-3)', fontSize: 13, padding: 20 }}>No issues flagged.</div>}
              {issues.map(issue => (
                <div key={issue.id} className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span className={severityClass[issue.severity]}>{issue.severity}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{issue.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 8 }}>{issue.description}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Flagged {issue.flaggedAt}</div>
                  {issue.partsNeeded && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Parts:</span>
                      {issue.partsNeeded.map(p => (
                        <span key={p} style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', background: 'var(--bg-hover)', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: 3, color: 'var(--text-2)' }}>{p}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'timeline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((ev, i) => (
                <div key={ev.id} style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: iconColor[ev.icon] ?? 'var(--text-3)', flexShrink: 0, marginTop: 2 }} />
                    {i < timeline.length - 1 && <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{ev.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'documents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {documents.length === 0 && <div style={{ color: 'var(--text-3)', fontSize: 13, padding: 20 }}>No documents.</div>}
              {documents.map(doc => (
                <div key={doc.id} className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{doc.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{doc.subtitle}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{doc.amount}</span>
                    <span className={`status-chip ${doc.status === 'paid' ? 's-paid' : 's-unpaid'}`}>{doc.status}</span>
                    <button className="q-action">PDF</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Technician */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Assigned Technician</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid rgba(79,142,247,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--accent)' }}>
                {technician.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>{technician.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)' }}>★ {technician.rating} · {technician.jobs} jobs</div>
              </div>
            </div>
          </div>

          {/* Schedules */}
          {schedules.length > 0 && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Upcoming Service</div>
              {schedules.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-1)' }}>{s.title}</div>
                  <span className={`status-chip ${s.status === 'Overdue' ? 's-overdue' : s.status === 'Due Soon' ? 's-pending' : 's-approved'}`}>{s.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
