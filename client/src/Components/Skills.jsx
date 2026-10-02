import { useEffect, useState, useCallback } from "react";
import SkillCard from "./Skillcard";
import { SkillModal } from "./AdminModals";
   import { getIcon } from "./iconList";
import { useAdmin } from "../AdminContext";
import api from "../api";

const small = "px-3 py-1 rounded-full border border-slate-600 text-xs text-slate-200 hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition-colors";

export default function Example() {
  const { isAdmin } = useAdmin();
  const [skills, setSkills] = useState([]);
  const [modal, setModal] = useState(null); // null | { skill } (skill is null when adding)

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

  return (
    <div className='bg-black text-white flex flex-col items-center bg-[url("https://assets.prebuiltui.com/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pt-16 pb-60 px-4'>
      <h1 className="text-4xl font-bold text-center mb-8">Skills</h1>

      {isAdmin && (
        <button
          onClick={() => setModal({ skill: null })}
          className="mb-6 px-5 py-2 rounded-full bg-[#A6FF5D] text-gray-800 text-sm font-medium"
        >
          + Add skill
        </button>
      )}

      {skills.length === 0 && <p className="text-slate-400">No skills added yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {skills.map((s) => (
          <div key={s._id}>
            <SkillCard
              icon={getIcon(s.icon)}
              name={s.name}
              level={Number(s.level) || 0}
            />
            {isAdmin && (
              <div className="mt-2 flex justify-center gap-2">
                <button className={small} onClick={() => setModal({ skill: s })}>Edit</button>
                <button className={small} onClick={() => remove(s._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal && (
        <SkillModal skill={modal.skill} onClose={() => setModal(null)} onSaved={load} />
      )}
    </div>
  );
}