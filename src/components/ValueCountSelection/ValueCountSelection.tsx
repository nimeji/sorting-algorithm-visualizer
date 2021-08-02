import { useEffect, useMemo } from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";

type ValueCountSelectionProps = {
  valueCount: number,
  maxValue: number,
  onChange?: (valueCount: number) => void;
};

export function ValueCountSelection({valueCount, maxValue, onChange}: ValueCountSelectionProps) {
  const values: number[] = useMemo(() => {
    const result = [];

    for(let i = 16; i < maxValue; i *= 2) {
      result.push(i);
    }
    result.push(maxValue);

    return result;
  }, [maxValue]);

  useEffect(() => {
    if(!onChange) return;
    
    if(valueCount > maxValue) onChange(maxValue);
    else if(valueCount < maxValue && !values.includes(valueCount)) {
      for(let i = 0; i < values.length; i++) {
        if(values[i] > valueCount) {
          onChange(values[i]);
          break;
        }
      }
    }
  }, [valueCount, maxValue, onChange, values]);

  return (
    <LabeledSelect text="Values" value={valueCount} onChange={(event) => {
      const value = parseInt(event.target.value);

      if(!isNaN(value) && onChange) {
        onChange(value);
      }
    }}>
      {values.map(value => <option key={value} value={value}>{value}</option>)}
    </LabeledSelect>
  );
}