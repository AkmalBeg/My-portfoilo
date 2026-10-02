import { useState } from "react";
import api from "../api";

export default function Example() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", text: "" });
        try {
            await api.post("/contact", form);
            setStatus({ type: "success", text: "Message sent. I will get back to you soon." });
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus({ type: "error", text: err.response?.data?.message || "Could not send. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <style>{`
        @keyframes submitShine {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease,
                      background-color 0.25s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 25px -8px rgba(166, 255, 93, 0.55);
        }
        .submit-btn:active {
          transform: translateY(0) scale(0.97);
          box-shadow: 0 4px 10px -4px rgba(166, 255, 93, 0.5);
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-120%) skewX(-20deg);
        }
        .submit-btn:hover::before {
          animation: submitShine 0.85s ease forwards;
        }
        .submit-btn .arrow-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .submit-btn:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>
        <section className="px-4 md:px-16 lg:px-24 xl:px-32 w-full pt-16 pb-5 bg-black text-white flex flex-col items-center bg-[url('https://assets.prebuiltui.com/components/hero-section/hero-background-image.png')] bg-cover bg-center bg-no-repeat">
            <p className="text-center font-medium text-black px-10 py-2 rounded-full bg-[#A6FF5D] border border-[#A6FF5D-800] w-max mx-auto">Contact</p>
            <h3 className="text-3xl font-semibold text-white text-center mx-auto mt-4">Reach out to us</h3>
            <p className="text-slate-300 text-center mt-2 max-w-md mx-auto">Ready to grow your brand? Let’s connect and build something exceptional together.</p>
        
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full">
                <div>
                    <p className="mb-2 font-medium">Your name</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-[#A6FF5D]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user size-5" aria-hidden="true">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input placeholder="Enter your name" className="w-full p-3 bg-transparent outline-none" type="text" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-medium">Email id</p>
                    <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-[#A6FF5D]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-5" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        <input placeholder="Enter your email" className="w-full p-3 bg-transparent outline-none" type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <p className="mb-2 font-medium">Message</p>
                    <textarea name="message" rows="5" placeholder="Enter your message" value={form.message} onChange={handleChange} required className="focus:border-[#A6FF5D] resize-none w-full p-3 bg-transparent outline-none rounded-lg overflow-hidden border border-slate-700"></textarea>
                </div>
                <button
        type="submit"
        disabled={loading}
        className="disabled:opacity-60 submit-btn w-max flex items-center gap-2 bg-[#A6FF5D] hover:bg-[#9CEF53] text-gray-800 font-medium px-10 py-3 rounded-full cursor-pointer"
      >
        {loading ? "Sending..." : "Submit"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-icon lucide lucide-arrow-right size-5"
          aria-hidden="true"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
            {status.text && (
                <p className={`sm:col-span-2 text-sm ${status.type === "success" ? "text-[#A6FF5D]" : "text-red-400"}`}>{status.text}</p>
            )}
            </form>

            <div className="max-w-7xl  mx-auto px-10 py-10 flex flex-col items-center">
               
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Turning ideas into fast, functional, and beautifully built applications.
                </p>
            </div>
            <div className="border-t border-[#A6FF5D]/40">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a  href="" className="text-[#A6FF5D]">
                        Akmal beg
                    </a> ©2026. All rights reserved.
                </div>
            </div>
        </section>

        
        </>
    );
};