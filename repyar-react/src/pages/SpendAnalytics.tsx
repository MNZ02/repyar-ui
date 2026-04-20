import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '../contexts/ThemeContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const categories = [
  { color: '#4F8EF7', label: 'Engine Repairs', amt: '₹3,45,000', perc: '24%' },
  { color: '#22D3A0', label: 'Tyres & Wheels', amt: '₹2,10,000', perc: '14%' },
  { color: '#F5A623', label: 'Suspension', amt: '₹1,85,000', perc: '13%' },
  { color: '#A78BFA', label: 'Brakes', amt: '₹1,50,000', perc: '10%' },
  { color: '#F05252', label: 'Routine Service', amt: '₹1,20,000', perc: '8%' },
  { color: '#3A4055', label: 'Other', amt: '₹4,40,000', perc: '31%' },
]

export default function SpendAnalytics() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const text2 = isLight ? '#64748B' : '#7B8599'
  const gridColor = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { label: 'Labour', data: [170, 260, 195, 235, 210, 225, 245, 200, 218, 240, 185, 220], backgroundColor: '#4F8EF7', borderRadius: 4 },
      { label: 'Parts', data: [60, 100, 82, 106, 90, 95, 115, 78, 88, 110, 75, 95], backgroundColor: '#22D3A0', borderRadius: 4 },
    ]
  }

  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { position: 'top' as const, align: 'end' as const, labels: { usePointStyle: true, boxWidth: 8, color: text2, font: { family: 'DM Mono, monospace', size: 11 } } },
      tooltip: {
        backgroundColor: isLight ? '#FFFFFF' : '#1C2030',
        borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
        borderWidth: 1, padding: 10,
        titleColor: isLight ? '#0F172A' : '#EDF0F5',
        bodyColor: text2,
        callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ₹${ctx.raw}K` }
      }
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { color: text2 } },
      y: { stacked: true, grid: { color: gridColor }, ticks: { color: text2, callback: (v: any) => '₹' + v + 'K' } }
    }
  }

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-title">Cost Breakdown (YTD)</div>
        <div className="page-actions">
          <button className="btn">This Year</button>
          <button className="btn prim">Export PDF</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Total Spend (YTD)</div>
          <div className="stat-val">₹15.8L</div>
          <div className="stat-sub" style={{ color: 'var(--red)' }}>↑ 9% vs last year</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Labour Cost</div>
          <div className="stat-val">₹8.6L</div>
          <div className="stat-sub">54.4% of total</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Parts & Materials</div>
          <div className="stat-val">₹3.5L</div>
          <div className="stat-sub">22.2% of total</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Cost Per Vehicle</div>
          <div className="stat-val">₹33K</div>
          <div className="stat-sub" style={{ color: 'var(--red)' }}>↑ 4% vs last year</div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-head"><div className="card-title">Monthly Spend Trend</div></div>
          <div style={{ flex: 1, height: 260 }}><Bar data={chartData} options={chartOpts} /></div>
        </div>

        <div className="card">
          <div className="card-head"><div className="card-title">Top Expense Categories</div></div>
          <div style={{ marginTop: 10 }}>
            {categories.map(c => (
              <div className="cat-row" key={c.label}>
                <div className="cat-lbl">
                  <div className="cat-dot" style={{ background: c.color }} />
                  {c.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="cat-amt">{c.amt}</div>
                  <div className="cat-perc">{c.perc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
