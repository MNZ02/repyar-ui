import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface InspectionItem {
  id: string
  name: string
  status: 'pass' | 'fail' | 'needs_attention' | null
  itemType: string
  severity: string | null
  notes: string | null
  issueDescription: string | null
  recommendedAction: string | null
}

interface InspectionSection {
  id: string
  name: string
  status: string | null
  notes: string | null
  items: InspectionItem[]
}

interface InspectionDetail {
  inspectionNumber: string
  status: string | null
  summary: string | null
  recommendations: string | null
  inspectorName: string | null
  startedAt: string | null
  completedAt: string | null
  job: { id: string; code: string; title: string }
  vehicle: { id: string; registration: string; makeModel: string }
  sections: InspectionSection[]
}

const mockInspections: Record<string, InspectionDetail> = {
  'INS-0041': {
    inspectionNumber: 'INS-0041', status: 'completed',
    summary: 'Vehicle in good condition overall. Front brake pads require immediate replacement. Minor attention needed on rear axle seals.',
    recommendations: 'Replace front brake pads (OEM). Re-inspect rear axle seals at next service. Tyre tread adequate — monitor for next 10,000 km.',
    inspectorName: 'Arjun Mehta', startedAt: 'Apr 9, 2026 · 09:00 AM', completedAt: 'Apr 9, 2026 · 01:00 PM',
    job: { id: 'j-2039', code: 'JOB-2039', title: 'Brake inspection & pad replace' },
    vehicle: { id: 'v-mh12', registration: 'MH12 9988', makeModel: 'Mahindra Blazo X 35' },
    sections: [
      {
        id: 's1', name: 'Engine & Drivetrain', status: 'pass', notes: 'Engine in good condition. No abnormal noises.',
        items: [
          { id: 'i1', name: 'Engine oil level & condition', status: 'pass', itemType: 'check', severity: null, notes: 'Oil clean, level adequate', issueDescription: null, recommendedAction: null },
          { id: 'i2', name: 'Coolant level', status: 'pass', itemType: 'check', severity: null, notes: null, issueDescription: null, recommendedAction: null },
          { id: 'i3', name: 'Belt & hose condition', status: 'pass', itemType: 'visual', severity: null, notes: 'All belts in good condition', issueDescription: null, recommendedAction: null },
          { id: 'i4', name: 'Transmission fluid', status: 'pass', itemType: 'check', severity: null, notes: null, issueDescription: null, recommendedAction: null },
        ],
      },
      {
        id: 's2', name: 'Brake System', status: 'fail', notes: 'Front brake pads require immediate replacement.',
        items: [
          { id: 'i5', name: 'Front brake pad thickness', status: 'fail', itemType: 'measurement', severity: 'High', notes: '2 mm — below 3 mm minimum', issueDescription: 'Front axle brake pad thickness critically low. Risk of metal-on-metal contact.', recommendedAction: 'Replace front brake pad set immediately. Inspect disc rotors for wear.' },
          { id: 'i6', name: 'Rear brake pads', status: 'pass', itemType: 'measurement', severity: null, notes: '6 mm — within spec', issueDescription: null, recommendedAction: null },
          { id: 'i7', name: 'Brake fluid level', status: 'pass', itemType: 'check', severity: null, notes: null, issueDescription: null, recommendedAction: null },
          { id: 'i8', name: 'Brake lines & hoses', status: 'pass', itemType: 'visual', severity: null, notes: null, issueDescription: null, recommendedAction: null },
        ],
      },
      {
        id: 's3', name: 'Suspension & Steering', status: 'pass', notes: null,
        items: [
          { id: 'i9', name: 'Front suspension arms', status: 'pass', itemType: 'visual', severity: null, notes: null, issueDescription: null, recommendedAction: null },
          { id: 'i10', name: 'Shock absorbers', status: 'pass', itemType: 'functional', severity: null, notes: 'No excessive bounce', issueDescription: null, recommendedAction: null },
          { id: 'i11', name: 'Steering play', status: 'pass', itemType: 'measurement', severity: null, notes: 'Within spec', issueDescription: null, recommendedAction: null },
        ],
      },
      {
        id: 's4', name: 'Tyres & Wheels', status: 'pass', notes: 'All tyres within acceptable range.',
        items: [
          { id: 'i12', name: 'Front tyre tread depth', status: 'pass', itemType: 'measurement', severity: null, notes: '5.2 mm', issueDescription: null, recommendedAction: null },
          { id: 'i13', name: 'Rear tyre tread depth', status: 'pass', itemType: 'measurement', severity: null, notes: '6.8 mm', issueDescription: null, recommendedAction: null },
          { id: 'i14', name: 'Tyre pressure', status: 'needs_attention', itemType: 'measurement', severity: 'Low', notes: 'Right rear 2 psi low', issueDescription: 'Right rear tyre slightly underinflated.', recommendedAction: 'Inflate to 90 PSI.' },
          { id: 'i15', name: 'Wheel nut torque', status: 'pass', itemType: 'measurement', severity: null, notes: null, issueDescription: null, recommendedAction: null },
        ],
      },
      {
        id: 's5', name: 'Electrical & Lights', status: 'needs_attention', notes: 'Rear right indicator intermittent.',
        items: [
          { id: 'i16', name: 'Headlights', status: 'pass', itemType: 'functional', severity: null, notes: null, issueDescription: null, recommendedAction: null },
          { id: 'i17', name: 'Rear indicators', status: 'needs_attention', itemType: 'functional', severity: 'Low', notes: null, issueDescription: 'Right rear indicator intermittent — possible loose connection.', recommendedAction: 'Inspect and reseat indicator bulb connector.' },
          { id: 'i18', name: 'Battery terminals', status: 'pass', itemType: 'visual', severity: null, notes: 'Clean, no corrosion', issueDescription: null, recommendedAction: null },
        ],
      },
    ],
  },
  'insp-040': {
    inspectionNumber: 'INS-0040', status: 'in_progress',
    summary: null, recommendations: null,
    inspectorName: 'Rajan Kumar', startedAt: 'Apr 7, 2026 · 10:00 AM', completedAt: null,
    job: { id: 'j-2041', code: 'JOB-2041', title: 'Engine overhaul' },
    vehicle: { id: 'v-dl1c', registration: 'DL1C 3344', makeModel: 'Tata Ace Gold' },
    sections: [
      {
        id: 's1', name: 'Engine & Drivetrain', status: 'fail', notes: 'Engine mount fracture found.',
        items: [
          { id: 'i1', name: 'Engine mount condition', status: 'fail', itemType: 'visual', severity: 'High', notes: null, issueDescription: 'Front-right engine mount shows stress fracture. Vibration at idle above 900 RPM.', recommendedAction: 'Replace engine mount bracket immediately.' },
          { id: 'i2', name: 'Oil pan gasket', status: 'needs_attention', itemType: 'visual', severity: 'Low', notes: 'Trace seep visible', issueDescription: 'Minor oil seep at pan gasket.', recommendedAction: 'Replace gasket during overhaul.' },
          { id: 'i3', name: 'Coolant hoses', status: 'pass', itemType: 'visual', severity: null, notes: null, issueDescription: null, recommendedAction: null },
        ],
      },
    ],
  },
}

const itemStatusIcon: Record<string, { icon: string; color: string }> = {
  pass: { icon: '✓', color: 'var(--green)' },
  fail: { icon: '✗', color: 'var(--red)' },
  needs_attention: { icon: '!', color: 'var(--amber)' },
}

const sectionStatusClass: Record<string, string> = { pass: 's-approved', fail: 's-rejected', needs_attention: 's-pending' }

export default function InspectionDetail() {
  const { id } = useParams<{ id: string }>()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const data = mockInspections[id ?? '']

  if (!data) {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)' }}>
          <div style={{ fontSize: 14 }}>Inspection not found: {id}</div>
          <Link to="/inspections" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>← Back to Inspections</Link>
        </div>
      </div>
    )
  }

  const allItems = data.sections.flatMap(s => s.items)
  const passed = allItems.filter(i => i.status === 'pass').length
  const failed = allItems.filter(i => i.status === 'fail').length
  const attention = allItems.filter(i => i.status === 'needs_attention').length
  const total = allItems.length

  const toggleSection = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <Link to="/inspections" style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}>← Inspections</Link>
          <div className="page-title" style={{ marginTop: 4 }}>{data.inspectionNumber}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, fontFamily: 'DM Mono, monospace' }}>
            {data.job.code} · {data.vehicle.registration} · {data.vehicle.makeModel}
          </div>
        </div>
        <div className="page-actions">
          <span className={`status-chip ${sectionStatusClass[data.status ?? 'pending'] ?? 's-pending'}`}>
            {(data.status ?? 'pending').replace('_', ' ')}
          </span>
          <button className="btn">Download PDF</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card"><div className="stat-lbl">Total Items</div><div className="stat-val">{total}</div></div>
        <div className="stat-card"><div className="stat-lbl">Passed</div><div className="stat-val" style={{ color: 'var(--green)' }}>{passed}</div></div>
        <div className="stat-card"><div className="stat-lbl">Failed</div><div className="stat-val" style={{ color: 'var(--red)' }}>{failed}</div></div>
        <div className="stat-card"><div className="stat-lbl">Needs Attention</div><div className="stat-val" style={{ color: 'var(--amber)' }}>{attention}</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.sections.map(section => {
            const isOpen = expanded[section.id] ?? true
            const sPass = section.items.filter(i => i.status === 'pass').length
            const sFail = section.items.filter(i => i.status === 'fail').length
            const sAttn = section.items.filter(i => i.status === 'needs_attention').length
            return (
              <div key={section.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => toggleSection(section.id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: isOpen ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)' }}>{section.name}</span>
                    {section.status && <span className={`status-chip ${sectionStatusClass[section.status] ?? 's-pending'}`} style={{ fontSize: 9 }}>{section.status.replace('_', ' ')}</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 11, fontFamily: 'DM Mono, monospace' }}>
                    <span style={{ color: 'var(--green)' }}>✓ {sPass}</span>
                    {sFail > 0 && <span style={{ color: 'var(--red)' }}>✗ {sFail}</span>}
                    {sAttn > 0 && <span style={{ color: 'var(--amber)' }}>! {sAttn}</span>}
                    <span style={{ color: 'var(--text-3)', fontSize: 10 }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </button>
                {isOpen && (
                  <div>
                    {section.items.map(item => {
                      const st = item.status ? itemStatusIcon[item.status] : null
                      return (
                        <div key={item.id} style={{ padding: '10px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: st ? `${st.color}22` : 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: st?.color ?? 'var(--text-3)', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>
                            {st?.icon ?? '·'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{item.name}</div>
                            {item.notes && <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{item.notes}</div>}
                            {item.issueDescription && (
                              <div style={{ marginTop: 4, padding: '6px 10px', background: 'var(--red-dim)', borderRadius: 4, fontSize: 11, color: 'var(--red)', borderLeft: '2px solid var(--red)' }}>
                                {item.issueDescription}
                              </div>
                            )}
                            {item.recommendedAction && (
                              <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-3)' }}>→ {item.recommendedAction}</div>
                            )}
                          </div>
                          {item.severity && <span className={`chip ${item.severity === 'High' ? 'chip-r' : item.severity === 'Medium' ? 'chip-a' : 'chip-n'}`} style={{ flexShrink: 0, alignSelf: 'flex-start' }}>{item.severity}</span>}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.summary || data.recommendations) && (
            <div className="card" style={{ padding: 16 }}>
              {data.summary && (
                <>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Summary</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.5 }}>{data.summary}</div>
                </>
              )}
              {data.recommendations && (
                <>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Recommendations</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{data.recommendations}</div>
                </>
              )}
            </div>
          )}

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Inspector Details</div>
            {[['Inspector', data.inspectorName ?? '—'], ['Job', data.job.code], ['Vehicle', data.vehicle.registration], ['Started', data.startedAt ?? '—'], ['Completed', data.completedAt ?? 'In progress']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
                <span style={{ color: 'var(--text-3)' }}>{l}</span>
                <span style={{ color: 'var(--text-1)', fontFamily: l === 'Vehicle' || l === 'Job' ? 'DM Mono, monospace' : 'inherit', fontSize: l === 'Started' || l === 'Completed' ? 10 : 11 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
