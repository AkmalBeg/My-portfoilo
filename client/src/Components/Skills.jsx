import { useEffect, useState, useCallback, useRef } from "react";
import SkillCard from "./Skillcard";
import { SkillModal } from "./AdminModals";
import { getIcon } from "./iconList";
import { useAdmin } from "../AdminContext";
import api from "../api";

const small = "px-3 py-1 rounded-full border border-slate-600 text-xs text-slate-200 hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition-colors";
const pageBtn = "min-w-9 h-9 px-3 rounded-full border text-sm transition-colors disabled:opacity-30 disabled:pointer-events-none";
const pageBtnIdle = "border-slate-600 text-slate-200 hover:border-[#A6FF5D] hover:text-[#A6FF5D]";

const PER_PAGE = 6;

export default function Example() {
  const { isAdmin } = useAdmin();
  const [skills, setSkills] = useState([]);
  const [modal, setModal] = useState(null); // null | { skill } (skill is null when adding)
  const [page, setPage] = useState(1);

  const sectionRef = useRef(null);
  const firstRender = useRef(true);

  const load = useCallback(() => {
    api.get("/skills").then(({ data }) => setSkills(data)).catch(console.error);
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await api.delete(`/skills/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // Pagination: 6 skills per page
  const totalPages = Math.max(1, Math.ceil(skills.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages); // if the last page empties after a delete, go back one
  const visibleSkills = skills.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const goTo = (p) => setPage(Math.min(Math.max(p, 1), totalPages));

  // After changing page, bring the top of this section back into view
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  return (
    // No "relative"/"isolate" here on purpose: a positioned wrapper would paint on top of the Contact section
    <div
      ref={sectionRef}
      className='w-full max-w-full overflow-hidden scroll-mt-16 bg-black text-white flex flex-col items-center pt-10 sm:pt-16 pb-60 px-4'
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8">Skills</h1>

      {isAdmin && (
        <button
          onClick={() => setModal({ skill: null })}
          className="mb-4 sm:mb-6 px-5 py-2 rounded-full bg-[#A6FF5D] text-gray-800 text-sm font-medium"
        >
          + Add skill
        </button>
      )}

      {skills.length === 0 && <p className="text-slate-400">No skills added yet.</p>}

      {/* 2 columns on phones, 3 from md up. min-w-0 stops long names from pushing the grid wider than the screen */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl">
        {visibleSkills.map((s) => (
          <div key={s._id} className="min-w-0">
            <SkillCard
              icon={getIcon(s.icon)}
              name={s.name}
              level={Number(s.level) || 0}
            />
            {isAdmin && (
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <button className={small} onClick={() => setModal({ skill: s })}>Edit</button>
                <button className={small} onClick={() => remove(s._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page controls: only shown when there is more than one page */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 sm:mt-10 max-w-full">
          <button
            className={`${pageBtn} ${pageBtnIdle}`}
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>

          {/* Phones: simple "2 / 4" label so the buttons never overflow */}
          <span className="sm:hidden px-2 text-sm text-slate-300">
            {currentPage} / {totalPages}
          </span>

          {/* Bigger screens: numbered buttons */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goTo(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={`${pageBtn} ${
                  n === currentPage
                    ? "bg-[#A6FF5D] border-[#A6FF5D] text-gray-800 font-medium"
                    : pageBtnIdle
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            className={`${pageBtn} ${pageBtnIdle}`}
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next ›
          </button>
        </div>
      )}

      {modal && (
        <SkillModal skill={modal.skill} onClose={() => setModal(null)} onSaved={load} />
      )}
    </div>
  );
}