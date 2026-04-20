import { useState } from 'react'

const vehicles = [
  { id: 'DL1C 3344', model: 'Tata Ace Gold', type: 'Mini Truck', status: 'In Service', last: 'Mar 12, 2026', next: 'Apr 25, 2026', health: 65, color: '#4F8EF7' },
  { id: 'MH12 9988', model: 'Mahindra Blazo X', type: 'HCV Truck', status: 'Operational', last: 'Apr 02, 2026', next: 'May 15, 2026', health: 92, color: '#22D3A0' },
  { id: 'KA01 5566', model: 'Ashok Leyland Dost', type: 'LCV Truck', status: 'Flagged', last: 'Feb 20, 2026', next: 'Apr 10, 2026', health: 45, color: '#F5A623' },
  { id: 'TN09 7712', model: 'Eicher Pro 2049', type: 'ICV Truck', status: 'Overdue', last: 'Jan 15, 2026', next: 'Apr 05, 2026', health: 30, color: '#F05252' },
  { id: 'KA05 AB 1234', model: 'Tata Prima 5530.S', type: 'Heavy Trailer', status: 'Operational', last: 'Apr 08, 2026', next: 'Jun 10, 2026', health: 98, color: '#22D3A0' },
  { id: 'DL01 G 4422', model: 'BharatBenz 1923C', type: 'Tipper', status: 'Operational', last: 'Mar 28, 2026', next: 'May 20, 2026', health: 88, color: '#22D3A0' },
  { id: 'MH04 JK 5500', model: 'Mahindra Furio 14', type: 'ICV Truck', status: 'In Service', last: 'Apr 05, 2026', next: 'Apr 15, 2026', health: 70, color: '#4F8EF7' },
  { id: 'KA03 M 9001', model: 'Tata Winger Cargo', type: 'Van', status: 'Operational', last: 'Apr 09, 2026', next: 'Jun 15, 2026', health: 95, color: '#22D3A0' },
]

const statusClass: Record<string, string> = {
  Operational: 's-operational', 'In Service': 's-inservice', Flagged: 's-flagged', Overdue: 's-overdue'
}

const filters = ['All Vehicles', 'Operational', 'In Maintenance', 'Flagged']

export default function Fleet() {
  const [active, setActive] = useState('All Vehicles')

  const filtered = active === 'All Vehicles' ? vehicles
    : vehicles.filter(v => active === 'In Maintenance' ? v.status === 'In Service' : v.status === active)

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Fleet Overview</div>
        <div className="page-actions">
          <button className="btn">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Export CSV
          </button>
          <button className="btn prim">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M7 2v10"/></svg>
            Add Vehicle
          </button>
        </div>
      </div>

      <div className="fleet-stats">
        <div className="f-kpi">
          <div className="f-kpi-icon" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="7" cy="4" rx="4" ry="2.5"/><path d="M3 4v6c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V4"/></svg>
          </div>
          <div><div className="f-kpi-val">48</div><div className="f-kpi-lbl">Total Fleet</div></div>
        </div>
        <div className="f-kpi">
          <div className="f-kpi-icon" style={{ background: 'var(--green-dim)', color: 'var(--green)' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><path d="M4.5 7l2 2 3-3"/></svg>
          </div>
          <div><div className="f-kpi-val">32</div><div className="f-kpi-lbl">Operational</div></div>
        </div>
        <div className="f-kpi">
          <div className="f-kpi-icon" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7h12M7 1v12"/></svg>
          </div>
          <div><div className="f-kpi-val">10</div><div className="f-kpi-lbl">In Service</div></div>
        </div>
        <div className="f-kpi">
          <div className="f-kpi-icon" style={{ background: 'var(--red-dim)', color: 'var(--red)' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1v12M1 7h12"/></svg>
          </div>
          <div><div className="f-kpi-val">2</div><div className="f-kpi-lbl">Overdue</div></div>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="filter-btn">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 3.5h12M3 7h8M5 10.5h4"/></svg>
            Filter
          </button>
        </div>
      </div>

      <div className="fleet-card">
        <table>
          <thead>
            <tr>
              <th>Vehicle Details</th>
              <th>Status</th>
              <th>Last Service</th>
              <th>Next Service</th>
              <th>Health</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} style={{ animationDelay: `${i * 40}ms` }}>
                <td>
                  <div className="v-info">
                    <div className="v-img">🚚</div>
                    <div>
                      <div className="v-name">{v.model}</div>
                      <span className="v-plate">{v.id}</span>
                    </div>
                  </div>
                </td>
                <td><span className={`status-chip ${statusClass[v.status]}`}>{v.status}</span></td>
                <td className="v-meta">{v.last}</td>
                <td className="v-meta" style={{ color: v.status === 'Overdue' ? 'var(--red)' : 'inherit' }}>{v.next}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 120 }}>
                    <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${v.health}%`, height: '100%', background: v.color }} />
                    </div>
                    <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', width: 24 }}>{v.health}%</span>
                  </div>
                </td>
                <td><span className="action-dots">•••</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
