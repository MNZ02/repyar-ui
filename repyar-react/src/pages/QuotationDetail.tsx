import { useParams, Link } from 'react-router-dom'

interface LineItem {
  id: string
  sequence: number
  itemType: 'part' | 'labor' | 'consumable' | 'service' | 'tax' | 'discount'
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  taxAmount: number | null
  discountAmount: number | null
  isOptional: boolean
}

interface QuotationDetail {
  quotationNumber: string
  jobCode: string
  vehicleReg: string
  vehicleMakeModel: string
  title: string
  status: 'pending' | 'approved' | 'rejected' | 'draft'
  totalAmount: number
  subtotal: number
  taxAmount: number
  discountAmount: number
  createdAt: string
  validUntil: string | null
  sentAt: string | null
  approvedAt: string | null
  rejectedAt: string | null
  rejectionReason: string | null
  notes: string | null
  lineItems: LineItem[]
}

const mockQuotations: Record<string, QuotationDetail> = {
  'Q-0192': {
    quotationNumber: 'Q-0192', jobCode: 'JOB-2041', vehicleReg: 'DL1C 3344', vehicleMakeModel: 'Tata Ace Gold',
    title: 'Suspension repair', status: 'pending', totalAmount: 2840000, subtotal: 2680000, taxAmount: 160000, discountAmount: 0,
    createdAt: 'Apr 10, 2026', validUntil: 'Apr 25, 2026', sentAt: 'Apr 10, 2026', approvedAt: null, rejectedAt: null, rejectionReason: null,
    notes: 'Includes all parts and labour for engine mount replacement and suspension inspection.',
    lineItems: [
      { id: 'li1', sequence: 1, itemType: 'part', name: 'Engine mount bracket (front-right)', quantity: 1, unitPrice: 420000, totalPrice: 420000, taxAmount: 25200, discountAmount: null, isOptional: false },
      { id: 'li2', sequence: 2, itemType: 'part', name: 'Mounting bolts M12×1.75 (set of 4)', quantity: 1, unitPrice: 48000, totalPrice: 48000, taxAmount: 2880, discountAmount: null, isOptional: false },
      { id: 'li3', sequence: 3, itemType: 'part', name: 'Gasket & seals set', quantity: 1, unitPrice: 280000, totalPrice: 280000, taxAmount: 16800, discountAmount: null, isOptional: false },
      { id: 'li4', sequence: 4, itemType: 'labor', name: 'Engine disassembly & reassembly', quantity: 8, unitPrice: 85000, totalPrice: 680000, taxAmount: 40800, discountAmount: null, isOptional: false },
      { id: 'li5', sequence: 5, itemType: 'labor', name: 'Suspension inspection & alignment', quantity: 3, unitPrice: 85000, totalPrice: 255000, taxAmount: 15300, discountAmount: null, isOptional: false },
      { id: 'li6', sequence: 6, itemType: 'service', name: 'Diagnostic scan & report', quantity: 1, unitPrice: 95000, totalPrice: 95000, taxAmount: 5700, discountAmount: null, isOptional: false },
      { id: 'li7', sequence: 7, itemType: 'consumable', name: 'Engine oil 15W-40 (5L)', quantity: 1, unitPrice: 82000, totalPrice: 82000, taxAmount: 4920, discountAmount: null, isOptional: false },
      { id: 'li8', sequence: 8, itemType: 'service', name: 'Wheel alignment check', quantity: 1, unitPrice: 80000, totalPrice: 80000, taxAmount: null, discountAmount: null, isOptional: true },
    ],
  },
  'Q-0189': {
    quotationNumber: 'Q-0189', jobCode: 'JOB-2039', vehicleReg: 'MH12 9988', vehicleMakeModel: 'Mahindra Blazo X 35',
    title: 'Tyre set (4×)', status: 'pending', totalAmount: 1480000, subtotal: 1392000, taxAmount: 88000, discountAmount: 0,
    createdAt: 'Apr 8, 2026', validUntil: 'Apr 28, 2026', sentAt: 'Apr 8, 2026', approvedAt: null, rejectedAt: null, rejectionReason: null,
    notes: null,
    lineItems: [
      { id: 'li1', sequence: 1, itemType: 'part', name: 'Front brake pad set (OEM)', quantity: 1, unitPrice: 320000, totalPrice: 320000, taxAmount: 19200, discountAmount: null, isOptional: false },
      { id: 'li2', sequence: 2, itemType: 'part', name: 'Brake dust shields', quantity: 2, unitPrice: 60000, totalPrice: 120000, taxAmount: 7200, discountAmount: null, isOptional: false },
      { id: 'li3', sequence: 3, itemType: 'labor', name: 'Brake service (front axle)', quantity: 4, unitPrice: 85000, totalPrice: 340000, taxAmount: 20400, discountAmount: null, isOptional: false },
      { id: 'li4', sequence: 4, itemType: 'service', name: 'Brake fluid flush', quantity: 1, unitPrice: 120000, totalPrice: 120000, taxAmount: 7200, discountAmount: null, isOptional: false },
      { id: 'li5', sequence: 5, itemType: 'service', name: 'Road test & inspection sign-off', quantity: 1, unitPrice: 92000, totalPrice: 92000, taxAmount: null, discountAmount: null, isOptional: false },
    ],
  },
  'Q-0188': {
    quotationNumber: 'Q-0188', jobCode: 'JOB-2042', vehicleReg: 'KA05 AB 1234', vehicleMakeModel: 'Tata Prima 5530.S',
    title: 'Transmission fluid flush', status: 'approved', totalAmount: 650000, subtotal: 611000, taxAmount: 39000, discountAmount: 0,
    createdAt: 'Apr 7, 2026', validUntil: 'Apr 21, 2026', sentAt: 'Apr 7, 2026', approvedAt: 'Apr 9, 2026', rejectedAt: null, rejectionReason: null,
    notes: 'Approved via portal by fleet manager.',
    lineItems: [
      { id: 'li1', sequence: 1, itemType: 'consumable', name: 'Transmission fluid (4L)', quantity: 1, unitPrice: 220000, totalPrice: 220000, taxAmount: 13200, discountAmount: null, isOptional: false },
      { id: 'li2', sequence: 2, itemType: 'labor', name: 'Transmission fluid drain & refill', quantity: 2, unitPrice: 85000, totalPrice: 170000, taxAmount: 10200, discountAmount: null, isOptional: false },
      { id: 'li3', sequence: 3, itemType: 'service', name: 'Transmission filter replacement', quantity: 1, unitPrice: 221000, totalPrice: 221000, taxAmount: null, discountAmount: null, isOptional: false },
    ],
  },
}

function formatAmount(paise: number) {
  return '₹' + (paise / 100).toLocaleString('en-IN')
}

const statusClass: Record<string, string> = { pending: 's-pending', approved: 's-approved', rejected: 's-rejected', draft: 's-draft' }
const typeClass: Record<string, string> = { part: 'chip chip-a', labor: 'chip chip-p', consumable: 'chip chip-n', service: 'chip chip-n', tax: 'chip chip-n', discount: 'chip chip-g' }

export default function QuotationDetail() {
  const { number } = useParams<{ number: string }>()
  const data = mockQuotations[number ?? '']

  if (!data) {
    return (
      <div className="content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-2)' }}>
          <div style={{ fontSize: 14 }}>Quotation not found: {number}</div>
          <Link to="/quotations" style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>← Back to Quotations</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <Link to="/quotations" style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}>← Quotations</Link>
          <div className="page-title" style={{ marginTop: 4 }}>{data.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, fontFamily: 'DM Mono, monospace' }}>
            {data.quotationNumber} · {data.jobCode} · {data.vehicleReg}
          </div>
        </div>
        <div className="page-actions">
          <span className={`status-chip ${statusClass[data.status]}`}>{data.status}</span>
          {data.status === 'pending' && <><button className="btn prim" style={{ background: 'var(--green)', borderColor: 'var(--green)' }}>Approve</button><button className="btn">Reject</button></>}
          <button className="btn">Download PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14 }}>
        <div>
          {/* Line items */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 13 }}>Line Items</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--bg-hover)' }}>
                  <th style={{ padding: '8px 18px', textAlign: 'left', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>#</th>
                  <th style={{ padding: '8px 8px', textAlign: 'left', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Item</th>
                  <th style={{ padding: '8px 8px', textAlign: 'center', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type</th>
                  <th style={{ padding: '8px 8px', textAlign: 'right', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Qty</th>
                  <th style={{ padding: '8px 8px', textAlign: 'right', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Unit Price</th>
                  <th style={{ padding: '8px 18px', textAlign: 'right', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.lineItems.map(item => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)', opacity: item.isOptional ? 0.6 : 1 }}>
                    <td style={{ padding: '10px 18px', color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', fontSize: 11 }}>{item.sequence}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{item.name}</div>
                      {item.isOptional && <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Optional</div>}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}><span className={typeClass[item.itemType]}>{item.itemType}</span></td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>{item.quantity}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(item.unitPrice)}</td>
                    <td style={{ padding: '10px 18px', textAlign: 'right', fontSize: 12, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.notes && (
            <div className="card" style={{ padding: 16, marginTop: 12 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Notes</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{data.notes}</div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Totals */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Summary</div>
            {[['Subtotal', data.subtotal], ['Tax (GST 18%)', data.taxAmount]].map(([l, v]) => (
              <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{l as string}</span>
                <span style={{ color: 'var(--text-1)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(v as number)}</span>
              </div>
            ))}
            {data.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--green)' }}>Discount</span>
                <span style={{ color: 'var(--green)', fontFamily: 'DM Mono, monospace' }}>−{formatAmount(data.discountAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', borderTop: '1px solid var(--border)', marginTop: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-1)', fontFamily: 'DM Mono, monospace' }}>{formatAmount(data.totalAmount)}</span>
            </div>
          </div>

          {/* Meta */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Details</div>
            {[['Vehicle', data.vehicleReg], ['Make & Model', data.vehicleMakeModel], ['Job', data.jobCode], ['Created', data.createdAt], ['Valid Until', data.validUntil ?? '—'], ['Sent', data.sentAt ?? '—'], ...(data.approvedAt ? [['Approved', data.approvedAt]] : []), ...(data.rejectedAt ? [['Rejected', data.rejectedAt]] : [])].map(([l, v]) => (
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
