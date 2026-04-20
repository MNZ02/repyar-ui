import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

type Tab = 'overview' | 'history' | 'compliance' | 'quotations'

const mockVehicles: Record<string, any> = {
  'DL1C 3344': {
    profile: { registration: 'DL1C 3344', makeModel: 'Tata Ace Gold', vehicleType: 'Mini Truck', year: '2021', fuelType: 'Diesel', transmission: 'Manual', color: 'White', variant: 'Ace Gold CNG DLX', vin: 'MAT456789012345', engineNumber: 'ACE21D1234567', chassisNumber: 'MAT456789012345', mileage: '84,200 km', lastService: 'Mar 12, 2026', lastServiceOdometer: '82,400 km', nextServiceDue: 'Apr 25, 2026', insuranceExpiry: 'Sep 30, 2026', pucExpiry: 'Oct 15, 2026', totalSpend: '₹2,14,000', totalJobs: '14', status: 'In Service', addedAt: 'Apr 9, 2025' },
    health: { score: 65, outOf: 100, confidence: 'medium', note: 'Engine overhaul in progress. Structural condition fair.', metrics: [{ label: 'Engine', value: '55%' }, { label: 'Brakes', value: '70%' }, { label: 'Suspension', value: '60%' }, { label: 'Electricals', value: '80%' }], lastChecked: 'Apr 7, 2026' },
    activeJob: { id: 'j-2041', code: 'JOB-2041', title: 'Engine overhaul', priority: 'high', progressLabel: 'Engine disassembly in progress', progress: 65, stage: 'Stage 5 of 8', technician: { name: 'Rajan Kumar', rating: '4.9', jobs: '24' } },
    serviceHistory: [
      { id: 'sh1', title: 'Full Service + Tyre Rotation', date: 'Mar 12, 2026', details: 'Oil change, air filter, tyre rotation — 82,400 km', amount: '₹8,400' },
      { id: 'sh2', title: 'Brake System Service', date: 'Jan 20, 2026', details: 'Front brake pads replaced, fluid flush — 78,100 km', amount: '₹6,200' },
      { id: 'sh3', title: 'Periodic Service', date: 'Oct 15, 2025', details: 'Oil + filter change — 72,600 km', amount: '₹4,800' },
    ],
    openIssues: [
      { id: 'iss-041', title: 'Cracked engine mount', description: 'Front-right engine mount stress fracture. Vibration at idle.', severity: 'High', flaggedAt: 'Apr 10, 2026' },
      { id: 'iss-040b', title: 'Oil pan gasket seep', description: 'Trace oil seep at oil pan gasket. Being replaced during overhaul.', severity: 'Low', flaggedAt: 'Apr 12, 2026' },
    ],
    inspectionSummary: { reportId: 'insp-040', jobCode: 'JOB-2041', date: 'Apr 7, 2026', total: 32, passed: 14, failed: 5, needsAttention: 4, overallStatus: 'in_progress' },
    documents: [{ id: 'doc1', title: 'Insurance Certificate', subtitle: 'Valid until Sep 30, 2026', action: '#' }, { id: 'doc2', title: 'PUC Certificate', subtitle: 'Valid until Oct 15, 2026', action: '#' }, { id: 'doc3', title: 'Registration Certificate', subtitle: 'DL1C 3344', action: '#' }],
    recentQuotations: [{ id: 'q-192', number: 'Q-0192', status: 'pending', amount: '₹28,400', date: 'Apr 10, 2026', sentAt: 'Apr 10, 2026', validUntil: 'Apr 25, 2026', lineItemCount: 3 }],
    schedules: [
      { id: 'sch4', title: 'Periodic Service', dueDate: 'Apr 25, 2026', status: 'Due Soon', type: 'Maintenance' },
      { id: 'sch12', title: 'PUC Renewal', dueDate: 'Jun 20, 2026', status: 'Upcoming', type: 'Compliance' },
      { id: 'sch-ins', title: 'Insurance Renewal', dueDate: 'Sep 30, 2026', status: 'Upcoming', type: 'Insurance' },
    ],
    commonIssues: [{ id: 'ci1', issue: 'Engine mount wear', frequency: 'Every 18 mo', recommendation: 'Inspect mounts at each service' }],
  },
  'MH12 9988': {
    profile: { registration: 'MH12 9988', makeModel: 'Mahindra Blazo X 35', vehicleType: 'HCV Truck', year: '2022', fuelType: 'Diesel', transmission: 'Manual', color: 'Red', variant: 'Blazo X 35 BS6', vin: 'MAH987654321098', engineNumber: 'BLZ22D9876543', chassisNumber: 'MAH987654321098', mileage: '1,12,400 km', lastService: 'Apr 02, 2026', lastServiceOdometer: '1,11,800 km', nextServiceDue: 'May 15, 2026', insuranceExpiry: 'Apr 25, 2026', pucExpiry: 'Dec 10, 2026', totalSpend: '₹3,85,000', totalJobs: '22', status: 'Operational', addedAt: 'Mar 12, 2024' },
    health: { score: 92, outOf: 100, confidence: 'high', note: 'Good condition. Brake service in progress.', metrics: [{ label: 'Engine', value: '95%' }, { label: 'Brakes', value: '85%' }, { label: 'Suspension', value: '90%' }, { label: 'Electricals', value: '98%' }], lastChecked: 'Apr 9, 2026' },
    activeJob: { id: 'j-2039', code: 'JOB-2039', title: 'Brake inspection & pad replace', priority: 'normal', progressLabel: 'Pre-delivery inspection', progress: 90, stage: 'Stage 7 of 8', technician: { name: 'Arjun Mehta', rating: '4.6', jobs: '19' } },
    serviceHistory: [
      { id: 'sh1', title: 'Periodic Service', date: 'Apr 2, 2026', details: 'Oil + filter, coolant check — 1,11,800 km', amount: '₹6,800' },
      { id: 'sh2', title: 'Tyre Set Replacement', date: 'Jan 10, 2026', details: '4 tyres replaced — 1,05,200 km', amount: '₹32,000' },
    ],
    openIssues: [{ id: 'iss-034', title: 'Worn front brake pads', description: 'Pad thickness at 2 mm, below 3 mm service limit.', severity: 'Medium', flaggedAt: 'Apr 8, 2026' }],
    inspectionSummary: { reportId: 'insp-041', jobCode: 'JOB-2039', date: 'Apr 9, 2026', total: 24, passed: 20, failed: 2, needsAttention: 2, overallStatus: 'completed' },
    documents: [{ id: 'doc1', title: 'Insurance Certificate', subtitle: 'Expires Apr 25, 2026', action: '#' }, { id: 'doc2', title: 'PUC Certificate', subtitle: 'Valid until Dec 10, 2026', action: '#' }],
    recentQuotations: [{ id: 'q-189', number: 'Q-0189', status: 'pending', amount: '₹14,800', date: 'Apr 8, 2026', sentAt: 'Apr 8, 2026', validUntil: 'Apr 28, 2026', lineItemCount: 3 }],
    schedules: [{ id: 'sch3', title: 'Insurance Renewal', dueDate: 'Apr 25, 2026', status: 'Due Soon', type: 'Insurance' }, { id: 'sch9', title: 'Annual Service', dueDate: 'May 15, 2026', status: 'Upcoming', type: 'Maintenance' }],
    commonIssues: [{ id: 'ci1', issue: 'Brake fade under load', frequency: 'Every 12 mo', recommendation: 'Use OEM pads for heavy-duty routes' }],
  },
}

const statusClass: Record<string, string> = { Operational: 's-operational', 'In Service': 's-inservice', Flagged: 's-flagged' }
const scheduleStatusClass: Record<string, string> = { Overdue: 's-overdue', 'Due Soon': 's-pending', Upcoming: 's-approved' }
const severityClass: Record<string, string> = { High: 'chip chip-r', Medium: 'chip chip-a', Low: 'chip chip-n' }
const quoteStatusClass: Record<string, string> = { pending: 's-pending', approved: 's-approved', rejected: 's-rejected' }


function SpecRow({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{label}</span>
      <span style={{ fontSize: 11, color: 'var(--text-1)', fontFamily: mono ? 'DM Mono, monospace' : 'inherit', fontWeight: 500 }}>{value ?? '—'}</span>
    </div>
  )
}

export default function VehicleDetail() {
  const { registration: rawReg } = useParams<{ registration: string }>()
  const registration = rawReg?.replace(/-/g, ' ') ?? ''
  const [tab, setTab] = useState<Tab>('overview')
  const data = mockVehicles[registration]

  if (!data) {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)' }}>
          <div style={{ fontSize: 14 }}>Vehicle not found: {registration}</div>
          <Link to="/fleet" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>← Back to Fleet</Link>
        </div>
      </div>
    )
  }

  const { profile, health, activeJob, serviceHistory, openIssues, inspectionSummary, documents, recentQuotations, schedules, commonIssues } = data

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <Link to="/fleet" style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}>← Fleet</Link>
          <div className="page-title" style={{ marginTop: 4 }}>{profile.makeModel}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>
            {[profile.year, profile.vehicleType, profile.fuelType, profile.transmission].filter(Boolean).join(' · ')}
          </div>
        </div>
        <div className="page-actions">
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, background: 'var(--bg-hover)', padding: '4px 10px', borderRadius: 4, border: '1px solid var(--border)' }}>{profile.registration}</span>
          <span className={`status-chip ${statusClass[profile.status]}`}>{profile.status}</span>
          <button className="btn prim">Schedule Maintenance</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="stats-row">
        <div className="stat-card"><div className="stat-lbl">Total Jobs</div><div className="stat-val">{profile.totalJobs}</div></div>
        <div className="stat-card"><div className="stat-lbl">Lifetime Spend</div><div className="stat-val">{profile.totalSpend}</div></div>
        <div className="stat-card"><div className="stat-lbl">Odometer</div><div className="stat-val" style={{ fontSize: 16 }}>{profile.mileage}</div></div>
        <div className="stat-card"><div className="stat-lbl">Next Service</div><div className="stat-val" style={{ fontSize: 14 }}>{profile.nextServiceDue ?? '—'}</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14 }}>
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 14 }}>
            {(['overview', 'history', 'compliance', 'quotations'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', fontSize: 12, fontWeight: tab === t ? 600 : 400, color: tab === t ? 'var(--accent)' : 'var(--text-2)', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', textTransform: 'capitalize' }}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Active job */}
              {activeJob ? (
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Job · {activeJob.code}</div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginTop: 3 }}>{activeJob.title}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--green-dim)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(34,211,160,.2)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                      <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 600 }}>Live</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8 }}>{activeJob.progressLabel} · {activeJob.stage}</div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${activeJob.progress}%`, height: '100%', background: 'var(--accent)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Assigned: <strong style={{ color: 'var(--text-1)' }}>{activeJob.technician.name}</strong></div>
                    <Link to={`/jobs/${activeJob.code}`} style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>View Job →</Link>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>No active jobs</div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {/* Open issues */}
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Open Issues</div>
                  {openIssues.length === 0 && <div style={{ fontSize: 12, color: 'var(--text-3)' }}>No open issues.</div>}
                  {openIssues.slice(0, 2).map((issue: any) => (
                    <div key={issue.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span className={severityClass[issue.severity]}>{issue.severity}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{issue.flaggedAt}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }}>{issue.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{issue.description}</div>
                    </div>
                  ))}
                </div>

                {/* Inspection summary */}
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Last Inspection</div>
                  {inspectionSummary ? (
                    <>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>{inspectionSummary.jobCode} · {inspectionSummary.date}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
                        {[['Pass', inspectionSummary.passed, 'var(--green)'], ['Fail', inspectionSummary.failed, 'var(--red)'], ['Alert', inspectionSummary.needsAttention, 'var(--amber)']].map(([l, v, c]) => (
                          <div key={l as string} style={{ textAlign: 'center', background: 'var(--bg-hover)', borderRadius: 4, padding: '6px 0' }}>
                            <div style={{ fontWeight: 700, fontSize: 16, color: c as string }}>{v as number}</div>
                            <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase' }}>{l as string}</div>
                          </div>
                        ))}
                      </div>
                      <Link to={`/inspections/${inspectionSummary.reportId}`} style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>View full report →</Link>
                    </>
                  ) : <div style={{ fontSize: 12, color: 'var(--text-3)' }}>No inspections on record.</div>}
                </div>
              </div>

              {/* Health metrics */}
              {health && (
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Health Score</div>
                    <div style={{ fontWeight: 700, fontSize: 18, fontFamily: 'DM Mono, monospace', color: health.score >= 80 ? 'var(--green)' : health.score >= 60 ? 'var(--amber)' : 'var(--red)' }}>{health.score}<span style={{ fontSize: 11, color: 'var(--text-3)' }}>/{health.outOf}</span></div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 12 }}>{health.note}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {health.metrics.map((m: any) => (
                      <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text-3)' }}>{m.label}</span>
                        <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {serviceHistory.map((item: any, idx: number) => (
                <div key={item.id} style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 4 }} />
                    {idx < serviceHistory.length - 1 && <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 4 }} />}
                  </div>
                  <div className="card" style={{ flex: 1, padding: 14, marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace' }}>{item.date}</div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{item.details}</div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green)', flexShrink: 0 }}>{item.amount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'compliance' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Compliance Schedule</div>
                {schedules.filter((s: any) => s.type !== 'Maintenance').map((s: any) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-1)' }}>{s.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Due {s.dueDate}</div>
                    </div>
                    <span className={`status-chip ${scheduleStatusClass[s.status]}`}>{s.status}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Documents</div>
                {documents.map((doc: any) => (
                  <div key={doc.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }}>{doc.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{doc.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'quotations' && (
            <div className="table-card">
              <table>
                <thead><tr><th>Quotation</th><th>Status</th><th>Amount</th><th>Date</th><th>Valid Until</th><th style={{ textAlign: 'right' }}>Items</th></tr></thead>
                <tbody>
                  {recentQuotations.map((q: any) => (
                    <tr key={q.id}>
                      <td><div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, fontWeight: 600 }}>{q.number}</div></td>
                      <td><span className={`status-chip ${quoteStatusClass[q.status]}`}>{q.status}</span></td>
                      <td style={{ fontWeight: 600 }}>{q.amount}</td>
                      <td style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'DM Mono, monospace' }}>{q.date}</td>
                      <td style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'DM Mono, monospace' }}>{q.validUntil ?? '—'}</td>
                      <td style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-2)' }}>{q.lineItemCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar: Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Vehicle Specs</div>
            <SpecRow label="VIN" value={profile.vin} mono />
            <SpecRow label="Engine No." value={profile.engineNumber} mono />
            <SpecRow label="Chassis" value={profile.chassisNumber} mono />
            <SpecRow label="Color" value={profile.color} />
            <SpecRow label="Variant" value={profile.variant} />
            <SpecRow label="Last Odometer" value={profile.lastServiceOdometer} />
            <SpecRow label="Insurance Exp." value={profile.insuranceExpiry} />
            <SpecRow label="PUC Exp." value={profile.pucExpiry} />
            <SpecRow label="Added" value={profile.addedAt} />
          </div>

          {/* Recurring issues */}
          {commonIssues.length > 0 && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recurring Issues</div>
              {commonIssues.map((ci: any) => (
                <div key={ci.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }}>{ci.issue}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{ci.frequency} · {ci.recommendation}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
