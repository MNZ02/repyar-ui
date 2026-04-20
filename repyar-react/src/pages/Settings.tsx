import { useState } from 'react'

const navItems = ['General Information', 'Notifications', 'Team Members', 'Billing & Plans', 'Integrations']

export default function Settings() {
  const [activeNav, setActiveNav] = useState('General Information')

  return (
    <div className="content" style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
      <div className="page-head" style={{ marginBottom: 10 }}>
        <div>
          <div className="page-title">Workspace Settings</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Configure Repyar for your business.</div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="s-nav">
          {navItems.map(n => (
            <div key={n} className={`s-nav-item${activeNav === n ? ' active' : ''}`} onClick={() => setActiveNav(n)}>{n}</div>
          ))}
        </div>

        <div className="s-panel">
          <div className="s-section">
            <div className="s-sec-title">Business Profile</div>
            <div className="s-sec-sub">Update your company details and contact information.</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-lbl">Company Name</label>
                <input type="text" className="form-input" defaultValue="Prime Logistics Pvt Ltd" />
              </div>
              <div className="form-group">
                <label className="form-lbl">Registration Number</label>
                <input type="text" className="form-input" defaultValue="CIN-U12345MH2021PTC123456" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-lbl">Business Address</label>
              <input type="text" className="form-input" defaultValue="45, Industrial Estate, Andheri East, Mumbai 400093" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-lbl">Support Email</label>
                <input type="email" className="form-input" defaultValue="operations@primelogistics.in" />
              </div>
              <div className="form-group">
                <label className="form-lbl">Phone Number</label>
                <input type="text" className="form-input" defaultValue="+91 98765 43210" />
              </div>
            </div>
            <button className="btn prim" style={{ marginTop: 10 }}>Save Changes</button>
          </div>

          <div className="s-section" style={{ animationDelay: '40ms' }}>
            <div className="s-sec-title">System Preferences</div>
            <div className="s-sec-sub">Customize how Repyar looks and behaves.</div>
            <div className="form-group">
              <label className="form-lbl">Currency</label>
              <select className="form-input" style={{ appearance: 'none' }}>
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-lbl">Date Format</label>
              <select className="form-input" style={{ appearance: 'none' }}>
                <option>MMM DD, YYYY (Apr 11, 2026)</option>
                <option>DD/MM/YYYY (11/04/2026)</option>
                <option>MM/DD/YYYY (04/11/2026)</option>
              </select>
            </div>
          </div>

          <div className="s-section" style={{ animationDelay: '80ms' }}>
            <div className="s-sec-title">Alert Rules</div>
            <div className="s-sec-sub">Configure automatic system alerts.</div>
            {[
              { label: 'Service Reminders', sub: 'Alert 7 days before scheduled maintenance.', def: true },
              { label: 'Overdue Invoices', sub: 'Auto-send email reminders for overdue payments.', def: true },
              { label: 'Compliance Warnings', sub: 'Alerts for PUC, Insurance, or Permit expiry.', def: true },
            ].map(t => (
              <div className="toggle-row" key={t.label}>
                <div>
                  <div className="toggle-lbl">{t.label}</div>
                  <div className="toggle-sub">{t.sub}</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked={t.def} />
                  <span className="slider" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
