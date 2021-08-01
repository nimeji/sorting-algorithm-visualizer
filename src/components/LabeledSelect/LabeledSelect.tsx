import { ReactNode } from "react"

type LabeledSelectProps = {
  text?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode;
}

export function LabeledSelect({text, value, onChange, disabled=false, children}: LabeledSelectProps) {

  const title = text ? <span>{text}</span> : undefined;

  return (
    <div>
      {title}
      <select value={value} onChange={onChange} disabled={disabled}>
        {children}
      </select>
    </div>
  );
}