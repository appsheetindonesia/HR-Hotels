import { useEffect, useRef } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions } from '../lib/actions'

/**
 * Settings > Company — the reference snapshot ships this as a static form with
 * both buttons permanently disabled. Rebuilt as a real controlled form: fields
 * edit in place, Save/Undo enable only when dirty, and saving raises a toast.
 */
export function SettingsCompany() {
  const { settings, dirty, setField, save, undo, toast } = useActions()
  const first = useRef<HTMLInputElement>(null)

  useEffect(() => { first.current?.focus() }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dirty) return
    save()
    toast('Company details saved')
  }

  return (
    <>
      <Tabs />
      <div className="page st">
        <header className="phead">
          <div className="phead__text">
            <h1 data-text="Company">Company</h1>
            <p>Saltwick Hotels Ltd · these details print on payslips and contracts.</p>
          </div>
        </header>

        <div className="st-grid">
          <form className="card" onSubmit={submit} noValidate>
            <div className="chead">
              <div className="chead__text">
                <h2>The company</h2>
                <p>As registered at Companies House</p>
              </div>
            </div>

            <div className="formgrid">
              <label className="field">
                <span>Trading name</span>
                <input ref={first} className="input" value={settings.company}
                  onChange={e => setField('company', e.target.value)} />
              </label>
              <label className="field">
                <span>Legal name</span>
                <input className="input" value={settings.company}
                  onChange={e => setField('company', e.target.value)} />
              </label>
              <label className="field">
                <span>Company number</span>
                <input className="input" inputMode="numeric" value={settings.reg}
                  onChange={e => setField('reg', e.target.value)} />
              </label>
              <label className="field">
                <span>VAT number</span>
                <input className="input" value={settings.vat}
                  onChange={e => setField('vat', e.target.value)} />
              </label>
              <label className="field span2">
                <span>Registered address</span>
                <input className="input" value={settings.address}
                  onChange={e => setField('address', e.target.value)} />
              </label>
            </div>

            <div className="section-label">Pay calendar</div>
            <div className="formgrid">
              <label className="field">
                <span>Payday (day of the month)</span>
                <input className="input" type="number" min={1} max={28} value={settings.payday}
                  onChange={e => setField('payday', e.target.value)} />
              </label>
              <label className="field">
                <span>Currency</span>
                <select className="select" value={settings.currency}
                  onChange={e => setField('currency', e.target.value)}>
                  <option>IDR · Rp</option>
                  <option>GBP · £</option>
                  <option>EUR · €</option>
                </select>
              </label>
              <label className="field">
                <span>Timezone</span>
                <select className="select" value={settings.timezone}
                  onChange={e => setField('timezone', e.target.value)}>
                  <option>Asia/Jakarta</option>
                  <option>Europe/London</option>
                  <option>UTC</option>
                </select>
              </label>
            </div>

            <div className="formfoot">
              <button type="button" className="btn" disabled={!dirty} onClick={() => { undo(); toast('Changes reverted') }}>
                Undo changes
              </button>
              <button type="submit" className="btn btn--primary" disabled={!dirty}>
                Save
              </button>
            </div>
          </form>

          <section className="card">
            <div className="chead">
              <div className="chead__text">
                <h2>The hotels</h2>
                <p>Each runs its own rota and shares one payroll</p>
              </div>
            </div>
            <div className="row-set">
              <span className="st-site" style={{ '--cc': 'var(--c1)' } as React.CSSProperties}><Ico name="robot" /></span>
              <span className="row-set__text"><b>Saltwick Harbour</b><small>Whitby · 48 rooms · 66 people</small></span>
              <span className="pill pill--good">Open</span>
            </div>
            <div className="row-set">
              <span className="st-site" style={{ '--cc': 'var(--c3)' } as React.CSSProperties}><Ico name="robot" /></span>
              <span className="row-set__text"><b>Moorgate Lodge</b><small>Goathland · 22 rooms · 29 people</small></span>
              <span className="pill pill--good">Open</span>
            </div>
            <div className="row-set">
              <span className="st-site" style={{ '--cc': 'var(--c5)' } as React.CSSProperties}><Ico name="robot" /></span>
              <span className="row-set__text"><b>The Quay Rooms</b><small>Robin Hood’s Bay · 16 rooms · 17 people</small></span>
              <span className="pill pill--good">Open</span>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
