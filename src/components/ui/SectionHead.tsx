import Reveal from "@/components/ui/Reveal";

type Props = {
  index?: string;
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHead({ index, label, title, subtitle }: Props) {
  return (
    <Reveal className="section-head">
      <div className="section-head__meta">
        {index ? <span className="section-head__index">{index}</span> : null}
        <span className="section-head__label">{label}</span>
      </div>
      <div className="section-head__row">
        <h2 className="section-head__title">{title}</h2>
        {subtitle ? <p className="section-head__sub">{subtitle}</p> : null}
      </div>
    </Reveal>
  );
}
