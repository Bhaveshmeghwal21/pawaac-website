export default function SectionMark({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-[11px] tracking-widest text-red">[ {index} ]</span>
      <span className="h-px w-8 bg-red/40" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
    </div>
  );
}
