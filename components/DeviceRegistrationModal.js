'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cpu, Plus, X } from 'lucide-react';
import { showToast } from './ToastHost';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DeviceRegistrationModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', model: 'ESP32 Fleet Node', macAddress: '', isGpsEnabled: true, isFuelEnabled: true, isRfidEnabled: true, healthCheckIntervalMinutes: 10, telemetryIntervalMinutes: 1 });
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setStatus('');
    try {
      const response = await fetch(`${apiUrl}/api/admin/microcontrollers`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Registration failed');
      setOpen(false); setForm((current) => ({ ...current, name: '', macAddress: '' })); showToast('ESP32 device registered successfully.'); router.refresh();
    } catch (error) { setStatus(error.message); showToast(error.message, 'error'); } finally { setSaving(false); }
  };
  return <>
    <button className="primary-button" onClick={() => { setStatus(''); setOpen(true); }}><Plus size={15} /> Register device</button>
    {open && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <form className="modal-card" onSubmit={submit}>
        <div className="section-heading"><div><p className="eyebrow">Hardware registry</p><h2><Cpu size={20} /> Register ESP32 device</h2><p>Use the factory eFuse MAC address printed by the firmware.</p></div><button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button></div>
        <label>Device name<input name="name" value={form.name} onChange={update} placeholder="Front gate controller" required /></label>
        <label>Model<input name="model" value={form.model} onChange={update} placeholder="ESP32 Fleet Node" /></label>
        <label>eFuse MAC address<input name="macAddress" value={form.macAddress} onChange={update} placeholder="A4CF128B9E04" pattern="[0-9a-fA-F: -]{12,17}" required /><small>12 hexadecimal characters; colons and hyphens are accepted.</small></label>
        <div className="form-grid"><label>Health check (minutes)<input type="number" min="1" name="healthCheckIntervalMinutes" value={form.healthCheckIntervalMinutes} onChange={update} /></label><label>GPS/fuel interval (minutes)<input type="number" min="1" name="telemetryIntervalMinutes" value={form.telemetryIntervalMinutes} onChange={update} /></label></div>
        <div className="check-grid">{[['isGpsEnabled','GPS'],['isFuelEnabled','Fuel / A22'],['isRfidEnabled','RFID']].map(([name, label]) => <label className="check-option" key={name}><input type="checkbox" name={name} checked={form[name]} onChange={update} /><span>{label}</span></label>)}</div>
        {status && <p className="form-error">{status}</p>}
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setOpen(false)}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? 'Registering…' : 'Register device'}</button></div>
      </form>
    </div>}
  </>;
}
