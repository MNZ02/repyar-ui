import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { useTheme } from '../contexts/ThemeContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend)

const C = {
  accent: '#4F8EF7', green: '#22D3A0', amber: '#F5A623', red: '#F05252', purple: '#A78BFA',
  accentFade: 'rgba(79,142,247,0.12)', greenFade: 'rgba(34,211,160,0.12)', amberFade: 'rgba(245,166,35,0.12)'
}

export default function Dashboard() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const gridColor = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'
  const text2 = isLight ? '#64748B' : '#7B8599'
  const tooltipBg = isLight ? '#FFFFFF' : '#1C2030'
  const tooltipBorder = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
  const tooltipTitle = isLight ? '#0F172A' : '#EDF0F5'
  const donutBorder = isLight ? '#FFFFFF' : '#161924'

  const baseChartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  }

  const spendData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { label: 'Misc', data: [20000, 35000, 18000, 40000, 25000, 38000], borderColor: C.amber, backgroundColor: C.amberFade, fill: true, tension: .4, borderWidth: 1.5, pointRadius: 2 },
      { label: 'Parts', data: [75000, 95000, 60000, 100000, 82000, 106000], borderColor: C.green, backgroundColor: C.greenFade, fill: true, tension: .4, borderWidth: 1.5, pointRadius: 2 },
      { label: 'Labour', data: [185000, 220000, 170000, 260000, 195000, 235000], borderColor: C.accent, backgroundColor: C.accentFade, fill: true, tension: .4, borderWidth: 1.5, pointRadius: 2 },
    ]
  }

  const spendOpts = {
    ...baseChartOpts,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg, borderColor: tooltipBorder, borderWidth: 1, padding: 10,
        titleColor: tooltipTitle, bodyColor: text2,
        callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ₹${(ctx.raw / 1000).toFixed(0)}K` }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: text2 } },
      y: { stacked: true, grid: { color: gridColor }, ticks: { color: text2, callback: (v: any) => '₹' + (v / 1000) + 'K' } }
    }
  }

  const fleetDonutData = {
    labels: ['Operational', 'In Service', 'Flagged', 'Overdue'],
    datasets: [{ data: [32, 10, 4, 2], backgroundColor: [C.green, C.accent, C.amber, C.red], borderColor: donutBorder, borderWidth: 2 }]
  }
  const costDonutData = {
    labels: ['Labour', 'Parts', 'Misc'],
    datasets: [{ data: [62, 28, 10], backgroundColor: [C.accent, C.green, C.amber], borderColor: donutBorder, borderWidth: 2 }]
  }
  const donutOpts = { cutout: '74%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

  const jobBarData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { label: 'Completed', data: [28, 34, 22, 38, 31, 87], backgroundColor: C.green, borderRadius: 3 },
      { label: 'In progress', data: [8, 10, 6, 12, 9, 12], backgroundColor: C.accent, borderRadius: 3 },
      { label: 'Overdue', data: [3, 4, 2, 5, 2, 3], backgroundColor: C.red, borderRadius: 3 },
    ]
  }
  const jobBarOpts = {
    ...baseChartOpts,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { color: text2 } }, y: { grid: { color: gridColor }, ticks: { color: text2, precision: 0 } } }
  }

  const makeSparkData = (d: number[], c: string) => ({
    labels: d.map((_, i) => i),
    datasets: [{ data: d, borderColor: c, borderWidth: 1.5, pointRadius: 0, fill: false, tension: .45 }]
  })
  const sparkOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } }
  }

  return (
    <div className="content">
      <div>
        <div className="sec-head">Overview</div>
        <div className="kpi-grid">
          <div className="kpi k-blue"><div className="kpi-lbl">Fleet size</div><div className="kpi-val">48</div><div className="kpi-chip chip-g">↑ +2 this month</div></div>
          <div className="kpi k-amber"><div className="kpi-lbl">Active jobs</div><div className="kpi-val">12</div><div className="kpi-chip chip-a">3 overdue</div></div>
          <div className="kpi k-green"><div className="kpi-lbl">Pending quotes</div><div className="kpi-val">5</div><div className="kpi-chip chip-n">₹1.24L total</div></div>
          <div className="kpi k-red"><div className="kpi-lbl">Outstanding</div><div className="kpi-val">₹3.2L</div><div className="kpi-chip chip-r">2 overdue</div></div>
        </div>
      </div>

      <div className="qa-row">
        <button className="qa-btn prim">+ New service request</button>
        <button className="qa-btn">+ Schedule inspection</button>
        <button className="qa-btn">Review alerts (4)</button>
        <button className="qa-btn">Export report</button>
      </div>

      <div className="spark-row">
        <div className="spark-item">
          <div className="spark-lbl">Avg repair time</div>
          <div className="spark-val">3.2 <span style={{ fontSize: 11, color: 'var(--text-2)' }}>days</span></div>
          <div style={{ height: 28 }}><Line data={makeSparkData([4.1, 3.8, 4.2, 3.5, 3.2, 3.0, 3.2], C.accent)} options={sparkOpts} /></div>
        </div>
        <div className="spark-item">
          <div className="spark-lbl">Jobs completed</div>
          <div className="spark-val">87 <span style={{ fontSize: 11, color: 'var(--text-2)' }}>this month</span></div>
          <div style={{ height: 28 }}><Line data={makeSparkData([28, 34, 22, 38, 31, 45, 87], C.green)} options={sparkOpts} /></div>
        </div>
        <div className="spark-item">
          <div className="spark-lbl">Invoice collection rate</div>
          <div className="spark-val">78<span style={{ fontSize: 11, color: 'var(--text-2)' }}>%</span></div>
          <div style={{ height: 28 }}><Line data={makeSparkData([65, 70, 60, 75, 72, 80, 78], C.amber)} options={sparkOpts} /></div>
        </div>
        <div className="spark-item">
          <div className="spark-lbl">Parts spend (Apr)</div>
          <div className="spark-val">₹48K</div>
          <div style={{ height: 28 }}><Line data={makeSparkData([32000, 40000, 28000, 52000, 44000, 56000, 48000], C.purple)} options={sparkOpts} /></div>
        </div>
      </div>

      <div className="g3">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Monthly spend <span className="ntag">needs backend</span></div>
            <span className="card-action">Full report →</span>
          </div>
          <div style={{ flex: 1, height: 140 }}><Line data={spendData} options={spendOpts} /></div>
          <div className="legend" style={{ marginTop: 12 }}>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.accent }} />Labour</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.green }} />Parts</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.amber }} />Misc</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-head"><div className="card-title">Fleet health</div></div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <div className="donut-wrap">
              <Doughnut data={fleetDonutData} options={donutOpts} />
              <div className="donut-center"><div className="donut-val">48</div><div className="donut-lbl">vehicles</div></div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            {[{ l: 'Operational', w: '66%', c: C.green, cls: 'c-g', n: 32 }, { l: 'In service', w: '20%', c: C.accent, cls: 'c-b', n: 10 }, { l: 'Flagged', w: '8%', c: C.amber, cls: 'c-a', n: 4 }, { l: 'Overdue', w: '4%', c: C.red, cls: 'c-r', n: 2 }].map(r => (
              <div className="fleet-row" key={r.l}>
                <span className="fleet-lbl">{r.l}</span>
                <div className="fleet-bar-wrap"><div className="fleet-track"><div className="fleet-fill" style={{ width: r.w, background: r.c }} /></div></div>
                <span className={`chip ${r.cls}`}>{r.n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-head"><div className="card-title">Cost split <span className="ntag">needs backend</span></div></div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <div className="donut-wrap">
              <Doughnut data={costDonutData} options={donutOpts} />
              <div className="donut-center"><div className="donut-val" style={{ fontSize: 14 }}>₹3.8L</div><div className="donut-lbl">Apr total</div></div>
            </div>
          </div>
          <div className="legend" style={{ justifyContent: 'center', marginTop: 10 }}>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.accent }} />Labour 62%</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.green }} />Parts 28%</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.amber }} />Misc 10%</div>
          </div>
          <div className="mini-stats">
            <div className="mini-stat"><div className="ms-lbl">Labour</div><div className="ms-val" style={{ color: C.accent }}>₹2.35L</div></div>
            <div className="mini-stat"><div className="ms-lbl">Parts</div><div className="ms-val" style={{ color: C.green }}>₹1.06L</div></div>
            <div className="mini-stat"><div className="ms-lbl">Misc</div><div className="ms-val" style={{ color: C.amber }}>₹38K</div></div>
          </div>
        </div>
      </div>

      <div className="g3">
        <div className="card">
          <div className="card-head"><div className="card-title">Active jobs</div><span className="card-action">View all →</span></div>
          {[
            { init: 'RK', bg: 'var(--accent-dim)', bc: 'rgba(79,142,247,.2)', tc: 'var(--accent)', name: 'Engine overhaul', status: 'In repair', scls: 'c-b', meta: 'JOB-2041 · DL1C 3344 · Rajan K.', prog: 65, pc: 'var(--accent)' },
            { init: 'AM', bg: 'var(--green-dim)', bc: 'rgba(34,211,160,.2)', tc: 'var(--green)', name: 'Brake inspection', status: 'Review', scls: 'c-g', meta: 'JOB-2039 · MH12 9988 · Arjun M.', prog: 90, pc: 'var(--green)' },
            { init: 'SK', bg: 'var(--amber-dim)', bc: 'rgba(245,166,35,.2)', tc: 'var(--amber)', name: 'AC & alignment', status: 'Waiting', scls: 'c-a', meta: 'JOB-2037 · KA01 5566 · Sunil K.', prog: 30, pc: 'var(--amber)' },
            { init: 'VP', bg: 'var(--red-dim)', bc: 'rgba(240,82,82,.2)', tc: 'var(--red)', name: 'Suspension rebuild', status: 'Overdue', scls: 'c-r', meta: 'JOB-2033 · TN09 7712 · Vijay P.', prog: 45, pc: 'var(--red)' },
          ].map(j => (
            <div className="job-item" key={j.meta}>
              <div className="tech" style={{ background: j.bg, border: `1px solid ${j.bc}`, color: j.tc }}>{j.init}</div>
              <div className="job-body">
                <div className="job-name">{j.name} <span className={`chip ${j.scls}`} style={{ fontSize: 9 }}>{j.status}</span></div>
                <div className="job-meta">{j.meta}</div>
                <div className="prog"><div className="prog-f" style={{ width: `${j.prog}%`, background: j.pc }} /></div>
              </div>
              <span style={{ fontSize: 10, color: j.scls === 'c-r' ? 'var(--red)' : 'var(--text-2)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>{j.prog}%</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Priority alerts <span className="ntag ntag-b">needs wiring</span></div>
            <span className="card-action">All →</span>
          </div>
          {[
            { c: 'var(--red)', title: 'PUC expiry — KA05AB1234', meta: 'Overdue · 3 days', mc: 'var(--red)' },
            { c: 'var(--amber)', title: 'Insurance due — MH12 9988', meta: 'Due in 5 days', mc: 'var(--amber)' },
            { c: 'var(--amber)', title: 'Quotation approval pending', meta: 'JOB-2041 · 2 days left' },
            { c: 'var(--accent)', title: 'Inspection report ready', meta: 'JOB-2039 · 1 hr ago' },
            { c: 'var(--green)', title: 'JOB-2031 completed', meta: 'DL1C 3344 · 2 hrs ago' },
          ].map((a, i) => (
            <div className="alert-item" key={i}>
              <div className="a-dot" style={{ background: a.c }} />
              <div className="a-body">
                <div className="a-title">{a.title}</div>
                <div className="a-meta" style={{ color: a.mc }}>{a.meta}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Pending quotations</div><span className="card-action">View all →</span></div>
          {[
            { id: 'Q-0192', name: 'Suspension repair', amt: '₹28,400', sub: 'Valid 18 Apr · DL1C 3344' },
            { id: 'Q-0189', name: 'Tyre set (4×)', amt: '₹14,800', sub: 'Valid 22 Apr · MH12 9988' },
            { id: 'Q-0185', name: 'Full service', amt: '₹9,200', sub: 'Valid 30 Apr · KA01 5566' },
          ].map(q => (
            <div className="q-item" key={q.id}>
              <div className="q-top"><span className="q-name">{q.id} — {q.name}</span><span className="q-amount">{q.amt}</span></div>
              <div className="q-sub">{q.sub}</div>
              <div className="q-btns"><button className="qb ap">Approve</button><button className="qb rj">Reject</button><button className="qb">View →</button></div>
            </div>
          ))}
        </div>
      </div>

      <div className="g3">
        <div className="card">
          <div className="card-head"><div className="card-title">Jobs by status — last 6 months</div></div>
          <div style={{ flex: 1, height: 120 }}><Bar data={jobBarData} options={jobBarOpts} /></div>
          <div className="legend" style={{ marginTop: 10 }}>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.green }} />Completed</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.accent }} />In progress</div>
            <div className="leg-item"><div className="leg-dot" style={{ background: C.red }} />Overdue</div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Mechanic performance</div><span className="card-action">Details →</span></div>
          {[
            { av: 'RK', name: 'Rajan Kumar', stars: '★★★★★', rating: 4.9, jobs: 24 },
            { av: 'AM', name: 'Arjun Mehta', stars: '★★★★', rating: 4.6, jobs: 19 },
            { av: 'SK', name: 'Sunil Kadam', stars: '★★★★', rating: 4.4, jobs: 17 },
            { av: 'VP', name: 'Vijay Patil', stars: '★★★', rating: 3.8, jobs: 12 },
          ].map(m => (
            <div className="mech-item" key={m.av}>
              <div className="mech-av">{m.av}</div>
              <div className="mech-info">
                <div className="mech-name">{m.name}</div>
                <div className="mech-stat"><span className="stars">{m.stars}</span> {m.rating}</div>
              </div>
              <div className="mech-jobs"><span style={{ color: 'var(--text-1)' }}>{m.jobs}</span> jobs</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Activity log <span className="ntag ntag-b">needs wiring</span></div>
            <span className="card-action">Full log →</span>
          </div>
          {[
            { c: 'var(--green)', title: 'JOB-2031 marked complete', time: 'Today, 10:22 AM', last: false },
            { c: 'var(--accent)', title: 'Inspection report uploaded — JOB-2039', time: 'Today, 09:45 AM', last: false },
            { c: 'var(--amber)', title: 'Quotation Q-0192 sent for approval', time: 'Yesterday, 04:10 PM', last: false },
            { c: 'var(--red)', title: 'PUC alert triggered — KA05AB1234', time: 'Yesterday, 08:00 AM', last: false },
            { c: 'var(--text-3)', title: 'New vehicle added — DL1C 3344', time: 'Apr 9, 03:15 PM', last: true },
          ].map((t, i) => (
            <div className="timeline-item" key={i}>
              <div className="tl-dot-col">
                <div className="tl-circle" style={{ background: t.c }} />
                {!t.last && <div className="tl-line" />}
              </div>
              <div className="tl-body"><div className="tl-title">{t.title}</div><div className="tl-time">{t.time}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, paddingBottom: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ background: 'var(--amber-dim)', color: 'var(--amber)', border: '1px solid rgba(245,166,35,.2)', padding: '1px 5px', borderRadius: 3, fontSize: 9 }}>needs backend</span>
          new endpoint required
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(79,142,247,.2)', padding: '1px 5px', borderRadius: 3, fontSize: 9 }}>needs wiring</span>
          backend ready, frontend not connected
        </span>
      </div>
    </div>
  )
}
