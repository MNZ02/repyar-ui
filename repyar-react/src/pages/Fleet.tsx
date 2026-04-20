import { useState } from 'react'
import { Link } from 'react-router-dom'

type VehicleProfileStatus = 'Operational' | 'In Service' | 'Flagged'

interface VehicleProfile {
  registration: string
  makeModel: string
  vehicleType: string
  year: string
  fuelType: string
  transmission: string
  status: VehicleProfileStatus
  lastService: string | null
  nextServiceDue: string | null
  mileage: string | null
  totalSpend: string
  totalJobs: string
  health: number
  color: string
}

const vehicles: VehicleProfile[] = [
  { registration: 'DL1C 3344', makeModel: 'Tata Ace Gold', vehicleType: 'Mini Truck', year: '2021', fuelType: 'Diesel', transmission: 'Manual', status: 'In Service', lastService: 'Mar 12, 2026', nextServiceDue: 'Apr 25, 2026', mileage: '84,200 km', totalSpend: '₹2,14,000', totalJobs: '14', health: 65, color: '#4F8EF7' },
  { registration: 'MH12 9988', makeModel: 'Mahindra Blazo X 35', vehicleType: 'HCV Truck', year: '2022', fuelType: 'Diesel', transmission: 'Manual', status: 'Operational', lastService: 'Apr 02, 2026', nextServiceDue: 'May 15, 2026', mileage: '1,12,400 km', totalSpend: '₹3,85,000', totalJobs: '22', health: 92, color: '#22D3A0' },
  { registration: 'KA01 5566', makeModel: 'Ashok Leyland Dost+', vehicleType: 'LCV Truck', year: '2020', fuelType: 'Diesel', transmission: 'Manual', status: 'Flagged', lastService: 'Feb 20, 2026', nextServiceDue: 'Apr 10, 2026', mileage: '1,45,600 km', totalSpend: '₹4,62,000', totalJobs: '31', health: 45, color: '#F5A623' },
  { registration: 'TN09 7712', makeModel: 'Eicher Pro 2049', vehicleType: 'ICV Truck', year: '2019', fuelType: 'Diesel', transmission: 'Manual', status: 'Flagged', lastService: 'Jan 15, 2026', nextServiceDue: 'Apr 05, 2026', mileage: '2,03,800 km', totalSpend: '₹6,10,000', totalJobs: '38', health: 30, color: '#F05252' },
  { registration: 'KA05 AB 1234', makeModel: 'Tata Prima 5530.S', vehicleType: 'Heavy Trailer', year: '2023', fuelType: 'Diesel', transmission: 'Automatic', status: 'Operational', lastService: 'Apr 08, 2026', nextServiceDue: 'Jun 10, 2026', mileage: '52,300 km', totalSpend: '₹1,28,000', totalJobs: '8', health: 98, color: '#22D3A0' },
  { registration: 'DL01 G 4422', makeModel: 'BharatBenz 1923C', vehicleType: 'Tipper', year: '2021', fuelType: 'Diesel', transmission: 'Manual', status: 'Operational', lastService: 'Mar 28, 2026', nextServiceDue: 'May 20, 2026', mileage: '98,700 km', totalSpend: '₹2,75,000', totalJobs: '18', health: 88, color: '#22D3A0' },
  { registration: 'MH04 JK 5500', makeModel: 'Mahindra Furio 14', vehicleType: 'ICV Truck', year: '2022', fuelType: 'Diesel', transmission: 'Manual', status: 'In Service', lastService: 'Apr 05, 2026', nextServiceDue: 'Apr 25, 2026', mileage: '76,100 km', totalSpend: '₹1,94,000', totalJobs: '12', health: 70, color: '#4F8EF7' },
  { registration: 'KA03 M 9001', makeModel: 'Tata Winger Cargo', vehicleType: 'Van', year: '2023', fuelType: 'Diesel', transmission: 'Manual', status: 'Operational', lastService: 'Apr 09, 2026', nextServiceDue: 'Jun 15, 2026', mileage: '38,900 km', totalSpend: '₹82,000', totalJobs: '6', health: 95, color: '#22D3A0' },
]

const statusClass: Record<VehicleProfileStatus, string> = {
  Operational: 's-operational', 'In Service': 's-inservice', Flagged: 's-flagged'
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
          <div className="f-kpi-icon" style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v7M7 11v1"/></svg>
          </div>
          <div><div className="f-kpi-val">6</div><div className="f-kpi-lbl">Flagged</div></div>
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
              <th>Vehicle</th>
              <th>Type / Year</th>
              <th>Status</th>
              <th>Last Service</th>
              <th>Next Due</th>
              <th>Mileage</th>
              <th>Health</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.registration} style={{ animationDelay: `${i * 40}ms` }}>
                <td>
                  <div className="v-info">
                    <div className="v-img">🚚</div>
                    <div>
                      <div className="v-name">{v.makeModel}</div>
                      <span className="v-plate">{v.registration}</span>
                    </div>
                  </div>
                </td>
                <td className="v-meta">{v.vehicleType} · {v.year}</td>
                <td><span className={`status-chip ${statusClass[v.status]}`}>{v.status}</span></td>
                <td className="v-meta">{v.lastService ?? '—'}</td>
                <td className="v-meta" style={{ color: v.status === 'Flagged' ? 'var(--red)' : 'inherit' }}>{v.nextServiceDue ?? '—'}</td>
                <td className="v-meta">{v.mileage ?? '—'}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 100 }}>
                    <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${v.health}%`, height: '100%', background: v.color }} />
                    </div>
                    <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', width: 24 }}>{v.health}%</span>
                  </div>
                </td>
                <td><Link to={`/fleet/${v.registration.replace(/ /g, '-')}`} style={{ fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>View →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
