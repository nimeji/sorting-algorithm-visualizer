import { useMemo } from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";

type WindowNumberSelectProps = {
  number: number;
  onChange?: (n: number) => void;
};

export function WindowNumberSelect({number, onChange}: WindowNumberSelectProps) {

  const options = useMemo(() => {
    const temp = [];
    for(let i = 1; i <= 8; i++) {
      temp[i] = <option key={i} value={i}>{i}</option>;
    }

    return temp;
  }, []);

  return (
    <LabeledSelect text="Windows" value={number} onChange={(event) => {
      const number = parseInt(event.target.value);

      if(!isNaN(number) && onChange) {
        onChange(number);
      }
    }}>
      {options}
    </LabeledSelect>
  );
}