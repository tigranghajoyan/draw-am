interface SectionHeadingProps {
  label: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p
        className={`uppercase text-sm tracking-widest font-heading mb-2 ${
          light ? "text-white/60" : "text-charcoal"
        }`}
      >
        {label}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-heading font-bold ${
          light ? "text-white" : "text-charcoal-darker"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
