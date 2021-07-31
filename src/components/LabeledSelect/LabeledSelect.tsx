import { ReactNode } from "react"

type LabeledSelectProps = {
  text?: string;
  value?: string
  onChange?: React.ChangeEventHandler;
  children?: ReactNode;
}

export function LabeledSelect({text, value, onChange, children}: LabeledSelectProps) {

  const title = text ? <span>{text}</span> : undefined;

  return (
    <div>
      {title}
      <select value={value} onChange={onChange} >
        {children}
      </select>
    </div>
  );
}