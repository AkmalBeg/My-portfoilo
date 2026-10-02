import { useState } from 'react'
import { createPortal } from 'react-dom'
import api, { fileUrl } from '../api'
import { iconOptions } from './skillIcons'

const field = 'w-full p-2.5 bg-transparent border border-slate-700 rounded-lg outline-none focus:border-[#A6FF5D] text-white'
const primary = 'px-5 py-2 rounded-full bg-[#A6FF5D] text-gray-800 font-medium text-sm disabled:opacity-60'
const ghost = 'px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm hover:border-[#A6FF5D]'

export function Modal({ title, onClose, children }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[#A6FF5D]/40 bg-black p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}

const errText = (err) => err.response?.data?.message || 'Something went wrong. Please try again.'

export function ProjectModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: project?.title || '',
    role: project?.role || '',
    description: project?.description || '',
    demoLink: project?.demoLink || '',
    codeLink: project?.codeLink || '',
    image: project?.image || '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const upload = async (file) => {
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    setBusy(true); setError('')
    try {
      const { data } = await api.post('/upload', fd)
      // the response key depends on your uploadImage controller, so accept the common ones
      const path = data.url || data.path || data.image || data.imageUrl || data.filePath
      if (!path) setError('Image uploaded, but the server did not return its path (check uploadImage in Settingcontroller.js).')
      else setForm((f) => ({ ...f, image: path }))
    } catch (err) { setError(errText(err)) }
    finally { setBusy(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      if (project?._id) await api.put(`/projects/${project._id}`, form)
      else await api.post('/projects', form)
      onSaved()
      onClose()
    } catch (err) { setError(errText(err)); setBusy(false) }
  }

  return (
    <Modal title={project ? 'Edit project' : 'Add project'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input className={field} placeholder="Title" required value={form.title} onChange={set('title')} />
        <input className={field} placeholder="Role (e.g. Full Stack Developer)" value={form.role} onChange={set('role')} />
        <textarea className={field} rows="3" placeholder="Short description" value={form.description} onChange={set('description')} />
        <input className={field} placeholder="Live demo link" value={form.demoLink} onChange={set('demoLink')} />
        <input className={field} placeholder="Source code link" value={form.codeLink} onChange={set('codeLink')} />
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => upload(e.target.files[0])} className="text-sm text-slate-300" />
          {form.image && <img src={fileUrl(form.image)} alt="" className="h-12 w-12 rounded-full object-cover" />}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2 pt-1">
          <button className={primary} disabled={busy} type="submit">{busy ? 'Saving...' : 'Save project'}</button>
          <button className={ghost} type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export function SkillModal({ skill, onClose, onSaved }) {
  const [form, setForm] = useState({ name: skill?.name || '', icon: skill?.icon || 'SiReact', level: skill?.level ?? 80 })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    const body = { name: form.name, icon: form.icon, level: Number(form.level) }
    try {
      if (skill?._id) await api.put(`/skills/${skill._id}`, body)
      else await api.post('/skills', body)
      onSaved()
      onClose()
    } catch (err) { setError(errText(err)); setBusy(false) }
  }

  return (
    <Modal title={skill ? 'Edit skill' : 'Add skill'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input className={field} placeholder="Skill name (e.g. React)" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className={field} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
          {iconOptions.map(([value, label]) => (
            <option key={value} value={value} className="bg-black">{label}</option>
          ))}
        </select>
        <div>
          <label className="mb-1 block text-sm text-slate-300">Proficiency: {form.level}%</label>
          <input type="range" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full accent-[#A6FF5D]" />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2 pt-1">
          <button className={primary} disabled={busy} type="submit">{busy ? 'Saving...' : 'Save skill'}</button>
          <button className={ghost} type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export function AboutModal({ description, onClose, onSaved }) {
  const [text, setText] = useState(description || '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await api.put('/about', { description: text })
      onSaved(text)
      onClose()
    } catch (err) { setError(errText(err)); setBusy(false) }
  }

  return (
    <Modal title="Edit about text" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <textarea className={field} rows="7" required value={text} onChange={(e) => setText(e.target.value)} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button className={primary} disabled={busy} type="submit">{busy ? 'Saving...' : 'Save about'}</button>
          <button className={ghost} type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}