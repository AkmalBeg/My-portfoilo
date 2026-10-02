const SkillCard = ({ icon: Icon, name, level }) => {
  return (
    <div className="group w-full h-56 [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-00 border border-[#A6FF5D]/40 px-6">
          <Icon className="w-10 h-10 text-[#A6FF5D]" />
          <span className="text-base font-medium text-slate-100">{name}</span>
        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center gap-4 rounded-lg bg-black border border-[#A6FF5D]/40 px-6">
          <span className="font-mono text-3xl font-semibold text-[#A6FF5D]">{level}%</span>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#A6FF5D]"
              style={{ width: `${level}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">Proficiency</span>
        </div>

      </div>
    </div>
  );
};

export default SkillCard;