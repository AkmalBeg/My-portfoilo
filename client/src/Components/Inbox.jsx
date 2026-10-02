import { createPortal } from 'react-dom'
import api from '../api'

const small = 'px-3 py-1 rounded-full border border-slate-600 text-xs text-slate-200 hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition-colors'

export default function Inbox({ messages, reload, onClose }) {
  const markRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`)
      reload()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update the message')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await api.delete(`/contact/${id}`)
      reload()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete the message')
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#A6FF5D]/40 bg-black p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Inbox ({messages.length})</h2>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white">✕</button>
        </div>

        {messages.length === 0 && <p className="text-sm text-slate-400">No messages yet.</p>}

        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m._id}
              className={`rounded-lg border p-4 ${m.read ? 'border-slate-800' : 'border-[#A6FF5D]/60 bg-[#A6FF5D]/5'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-medium">{m.name}</span>{' '}
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message')}`} className="text-sm text-[#A6FF5D] hover:underline">
                    {m.email}
                  </a>
                </div>
                <span className="text-xs text-slate-500">
                  {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-300">{m.message}</p>

              <div className="mt-3 flex gap-2">
                {!m.read && <button className={small} onClick={() => markRead(m._id)}>Mark as read</button>}
                <a className={small} href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message')}`}>Reply</a>
                <button className={small} onClick={() => remove(m._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
}