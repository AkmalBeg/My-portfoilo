import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAdmin } from '../AdminContext'
import api from '../api'

const Login = () => {
    const navigate = useNavigate()
    const { isAdmin, login } = useAdmin()
    const [formData, setFormData] = React.useState({ email: '', password: '' })
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const { data } = await api.post('/user/login', formData)
            login(data.token)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    if (isAdmin) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 pb-10 bg-gray-500">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
                <p className="text-gray-900 text-sm mt-2">Please sign in to continue</p>

                <div className="flex items-center w-full mt-6 bg-transparent border border-[#A6FF8D] h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="flex items-center mt-4 w-full bg-transparent border border-[#A6FF8D] h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>

                {error && <p className="text-red-700 text-sm mt-3">{error}</p>}

                <button type="submit" disabled={loading} className="mt-6 w-full h-11 text-xl rounded-full text-black bg-[#A6FF8D] hover:opacity-90 transition-opacity disabled:opacity-60">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default Login
