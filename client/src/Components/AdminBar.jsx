import { useCallback, useEffect, useState } from 'react'
import { useAdmin } from '../AdminContext'
import api from '../api'
import Inbox from './Inbox'

export default function AdminBar() {
  const { isAdmin, logout } = useAdmin()
  const [messages, setMessages] = useState([])
  const [open, setOpen] = useState(false)

  const load = useCallback(() => {
    api.get('/contact').then(({ data }) => setMessages(data)).catch(() => {})
  }, [])

  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin, load])

  if (!isAdmin) return null

  const unread = messages.filter((m) => !m.read).length

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full border border-[#A6FF5D]/50 bg-black/90 px-4 py-2 text-sm text-white backdrop-blur">
        <span className="text-[#A6FF5D]">Admin mode</span>
        <button onClick={() => { load(); setOpen(true) }} className="relative rounded-full border border-slate-600 px-3 py-1 hover:border-[#A6FF5D]">
          Inbox
          {unread > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A6FF5D] px-1 text-xs font-semibold text-gray-900">
              {unread}
            </span>
          )}
        </button>
        <button onClick={logout} className="rounded-full border border-slate-600 px-3 py-1 hover:border-[#A6FF5D]">
          Log out
        </button>
      </div>

      {open && <Inbox messages={messages} reload={load} onClose={() => setOpen(false)} />}
    </>
  )
}