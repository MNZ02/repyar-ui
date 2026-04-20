import { useParams, Link } from 'react-router-dom'

interface InvoiceItem {
  id: string
  sequence: number
  itemType: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  taxAmount: number | null
}

interface Payment {
  id: string
  paymentNumber: string
  amount: number
  paymentMethod: string
  status: string
  paidAt: string | null
  notes: string | null
}

interface InvoiceDetail {
  invoiceNumber: string
  jobCode: string
  vehicleReg: string
  vehicleMakeModel: string
  title: string
  status: string
  totalAmount: number
  paidAmount: number
  balanceAmount: number
  subtotal: number
  taxAmount: number
  discountAmount: number
  issuedAt: string | null
  dueDate: string | null
  paidAt: string | null
  notes: string | null
  items: InvoiceItem[]
  payments: Payment[]
}

const mockInvoices: Record<string, InvoiceDetail> = {
  'INV-4088': {
    invoiceNumber: 'INV-4088', jobCode: 'JOB-2041', vehicleReg: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold',
    title: 'Engine overhaul', status: 'sent', totalAmount: 12000000, paidAmount: 0, balanceAmount: 12000000,
    subtotal: 11300000, taxAmount: 700000, discountAmount: 0, issuedAt: 'Apr 5, 2026', dueDate: 'Apr 20, 2026', paidAt: null, notes: 'Payment due within 15 days of invoice date.',
    items: [
      { id: 'ii1', sequence: 1, itemType: 'part', name: 'Engine mount bracket (front-right)', quantity: 1, unitPrice: 420000, totalPrice: 420000, taxAmount: 25200 },
      { id: 'ii2', sequence: 2, itemType: 'part', name: 'Gasket & seals set', quantity: 1, unitPrice: 280000, totalPrice: 280000, taxAmount: 16800 },
      { id: 'ii3', sequence: 3, itemType: 'part', name: 'Mounting bolts set', quantity: 1, unitPrice: 48000, totalPrice: 48000, taxAmount: 2880 },
      { id: 'ii4', sequence: 4, itemType: 'labor', name: 'Engine disassembly & reassembly', quantity: 8, unitPrice: 85000, totalPrice: 680000, taxAmount: 40800 },
      { id: 'ii5', sequence: 5, itemType: 'labor', name: 'Suspension inspection', quantity: 3, unitPrice: 85000, totalPrice: 255000, taxAmount: 15300 },
      { id: 'ii6', sequence: 6, itemType: 'service', name: 'Diagnostic scan & report', quantity: 1, unitPrice: 95000, totalPrice: 95000, taxAmount: 5700 },
      { id: 'ii7', sequence: 7, itemType: 'consumable', name: 'Engine oil 15W-40 (5L)', quantity: 1, unitPrice: 82000, totalPrice: 82000, taxAmount: 4920 },
    ],
    payments: [],
  },
  'INV-4082': {
    invoiceNumber: 'INV-4082', jobCode: 'JOB-2031', vehicleReg: 'DL01 G 4422', vehicleMakeModel: 'BharatBenz 1923C',
    title: 'Routine full service', status: 'paid', totalAmount: 920000, paidAmount: 920000, balanceAmount: 0,
    subtotal: 870000, taxAmount: 50000, discountAmount: 0, issuedAt: 'Mar 28, 2026', dueDate: 'Apr 12, 2026', paidAt: 'Apr 10, 2026', notes: null,
    items: [
      { id: 'ii1', sequence: 1, itemType: 'consumable', name: 'Engine oil 15W-40 (5L)', quantity: 1, unitPrice: 82000, totalPrice: 82000, taxAmount: 4920 },
      { id: 'ii2', sequence: 2, itemType: 'part', name: 'Oil filter', quantity: 1, unitPrice: 45000, totalPrice: 45000, taxAmount: 2700 },
      { id: 'ii3', sequence: 3, itemType: 'part', name: 'Air filter', quantity: 1, unitPrice: 65000, totalPrice: 65000, taxAmount: 3900 },
      { id: 'ii4', sequence: 4, itemType: 'labor', name: 'Full service labour', quantity: 4, unitPrice: 85000, totalPrice: 340000, taxAmount: 20400 },
      { id: 'ii5', sequence: 5, itemType: 'service', name: 'Tyre rotation & inspection', quantity: 1, unitPrice: 80000, totalPrice: 80000, taxAmount: null },
      { id: 'ii6', sequence: 6, itemType: 'service', name: 'Multi-point inspection', quantity: 1, unitPrice: 258000, totalPrice: 258000, taxAmount: null },
    ],
    payments: [
      { id: 'pay1', paymentNumber: 'PAY-1021', amount: 920000, paymentMethod: 'Bank Transfer', status: 'completed', paidAt: 'Apr 10, 2026', notes: 'NEFT — Ref: HDFC20260410' },
    ],
  },
  'INV-4091': {
    invoiceNumber: 'INV-4091', jobCode: 'JOB-2033', vehicleReg: 'TN09 7712', vehicleMakeModel: 'Eicher Pro 2049',
    title: 'Suspension rebuild', status: 'overdue', totalAmount: 4200000, paidAmount: 0, balanceAmount: 4200000,
    subtotal: 3960000, taxAmount: 240000, discountAmount: 0, issuedAt: 'Apr 2, 2026', dueDate: 'Apr 9, 2026', paidAt: null, notes: 'Payment overdue. Please remit immediately.',
    items: [
      { id: 'ii1', sequence: 1, itemType: 'part', name: 'Rear leaf spring assembly', quantity: 1, unitPrice: 1800000, totalPrice: 1800000, taxAmount: 108000 },
      { id: 'ii2', sequence: 2, itemType: 'part', name: 'U-bolts set', quantity: 2, unitPrice: 120000, totalPrice: 240000, taxAmount: 14400 },
      { id: 'ii3', sequence: 3, itemType: 'part', name: 'Spring shackle pins', quantity: 4, unitPrice: 60000, totalPrice: 240000, taxAmount: 14400 },
      { id: 'ii4', sequence: 4, itemType: 'labor', name: 'Suspension rebuild labour', quantity: 10, unitPrice: 85000, totalPrice: 850000, taxAmount: 51000 },
      { id: 'ii5', sequence: 5, itemType: 'service', name: 'Wheel alignment post-rebuild', quantity: 1, unitPrice: 150000, totalPrice: 150000, taxAmount: null },
      { id: 'ii6', sequence: 6, itemType: 'service', name: 'Road test', quantity: 1, unitPrice: 680000, totalPrice: 680000, taxAmount: null },
    ],
    payments: [],
  },
}

function formatAmount(paise: number) {
  return '₹' + (paise / 100).toLocaleString('en-IN')
}

const statusLabel: Record<string, string> = { sent: 'Unpaid', paid: 'Paid', overdue: 'Overdue', partially_paid: 'Partial' }
const statusClass: Record<string, string> = { sent: 's-unpaid', paid: 's-paid', overdue: 's-overdue', partially_paid: 's-unpaid' }
const typeClass: Record<string, string> = { part: 'chip chip-a', labor: 'chip chip-p', consumable: 'chip chip-n', service: 'chip chip-n' }

export default function InvoiceDetail() {
  const { number } = useParams<{ number: string }>()
  const data = mockInvoices[number ?? '']

  if (!data) {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)' }}>
          <div style={{ fontSize: 14 }}>Invoice not found: {number}</div>
          <Link to="/invoices" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>← Back to Invoices</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <Link to="/invoices" style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}>← Invoices</Link>
          <div className="page-title" style={{ marginTop: 4 }}>{data.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, fontFamily: 'DM Mono, monospace' }}>
            {data.invoiceNumber} · {data.jobCode} · {data.vehicleReg}
          </div>
        </div>
        <div className="page-actions">
          <span className={`status-chip ${statusClass[data.status]}`}>{statusLabel[data.status] ?? data.status}</span>
          {data.status !== 'paid' && <button className="btn prim">Record Payment</button>}
          <button className="btn">Download PDF</button>
        </div>
      </div>

      {/* Payment progress bar for partial/overdue */}
      {data.totalAmount > 0 && (
        <div className="card" style={{ padding: '12px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: 'var(--text-2)' }}>Payment progress</span>
            <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{formatAmount(data.paidAmount)} of {formatAmount(data.totalAmount)}</span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(data.paidAmount / data.totalAmount) * 100}%`, height: '100%', background: 'var(--green)', borderRadius: 3 }} />
          </div>
          {data.balanceAmount > 0 && (
            <div style={{ marginTop: 6, fontSize: 11, color: data.status === 'overdue' ? 'var(--red)' : 'var(--text-3)' }}>
              Balance due: <strong>{formatAmount(data.balanceAmount)}</strong>{data.dueDate && ` · Due ${data.dueDate}`}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Line items */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 13 }}>Items</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--bg-hover)' }}>
                  {['#', 'Item', 'Type', 'Qty', 'Unit Price', 'Tax', 'Total'].map((h, i) => (
                    <th key={h} style={{ padding: '8px ' + (i === 0 ? '18px' : i === 6 ? '18px' : '8px'), textAlign: i > 2 ? 'right' : 'left', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map(item => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 18px', color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', fontSize: 11 }}>{item.sequence}</td>
                    <td style={{ padding: '10px 8px', fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: '10px 8px' }}><span className={typeClass[item.itemType] ?? 'chip chip-n'}>{item.itemType}</span></td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--text-2)' }}>{item.quantity}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--text-2)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(item.unitPrice)}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', fontSize: 11, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace' }}>{item.taxAmount ? formatAmount(item.taxAmount) : '—'}</td>
                    <td style={{ padding: '10px 18px', textAlign: 'right', fontWeight: 600, color: 'var(--text-1)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payments */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 13 }}>Payment History</div>
            {data.payments.length === 0 ? (
              <div style={{ padding: '20px 18px', color: 'var(--text-3)', fontSize: 12 }}>No payments recorded yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-hover)' }}>
                    {['Payment No.', 'Method', 'Amount', 'Date', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '8px 18px', textAlign: 'left', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map(p => (
                    <tr key={p.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 18px', fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--text-1)' }}>{p.paymentNumber}</td>
                      <td style={{ padding: '10px 18px', color: 'var(--text-2)' }}>{p.paymentMethod}</td>
                      <td style={{ padding: '10px 18px', fontWeight: 600, color: 'var(--green)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(p.amount)}</td>
                      <td style={{ padding: '10px 18px', color: 'var(--text-2)', fontFamily: 'DM Mono, monospace', fontSize: 11 }}>{p.paidAt ?? '—'}</td>
                      <td style={{ padding: '10px 18px', color: 'var(--text-3)', fontSize: 11 }}>{p.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Summary</div>
            {[['Subtotal', data.subtotal], ['Tax', data.taxAmount]].map(([l, v]) => (
              <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{l as string}</span>
                <span style={{ fontFamily: 'DM Mono, monospace' }}>{formatAmount(v as number)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 6px', borderTop: '1px solid var(--border)', marginTop: 6, fontSize: 13, fontWeight: 700 }}>
              <span>Total</span><span style={{ fontFamily: 'DM Mono, monospace' }}>{formatAmount(data.totalAmount)}</span>
            </div>
            {data.paidAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--green)' }}>Paid</span>
                <span style={{ color: 'var(--green)', fontFamily: 'DM Mono, monospace' }}>−{formatAmount(data.paidAmount)}</span>
              </div>
            )}
            {data.balanceAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, fontWeight: 600 }}>
                <span style={{ color: data.status === 'overdue' ? 'var(--red)' : 'var(--amber)' }}>Balance</span>
                <span style={{ color: data.status === 'overdue' ? 'var(--red)' : 'var(--amber)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(data.balanceAmount)}</span>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Details</div>
            {[['Vehicle', data.vehicleReg], ['Make & Model', data.vehicleMakeModel], ['Job', data.jobCode], ['Issued', data.issuedAt ?? '—'], ['Due', data.dueDate ?? '—'], ...(data.paidAt ? [['Paid', data.paidAt]] : [])].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
                <span style={{ color: 'var(--text-3)' }}>{l}</span>
                <span style={{ color: 'var(--text-1)', fontFamily: l === 'Vehicle' || l === 'Job' ? 'DM Mono, monospace' : 'inherit' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
