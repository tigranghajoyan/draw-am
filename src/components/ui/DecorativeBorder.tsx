interface DecorativeBorderProps {
  className?: string;
}

export default function DecorativeBorder({
  className = "",
}: DecorativeBorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top-left corner */}
      <span className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/30" />

      {/* Top-right corner */}
      <span className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/30" />

      {/* Bottom-left corner */}
      <span className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/30" />

      {/* Bottom-right corner */}
      <span className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/30" />
    </div>
  );
}
