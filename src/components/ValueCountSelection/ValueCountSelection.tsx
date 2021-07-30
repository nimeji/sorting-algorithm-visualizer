type ValueCountSelectionProps = {
  valueCount: number,
  maxValue: number,
  onChange?: (valueCount: number) => void;
};

export function ValueCountSelection({valueCount, maxValue, onChange}: ValueCountSelectionProps) {
  const values: number[] = [];
  
  for(let i = 16; i < maxValue; i *= 2) {
    values.push(i);
  }
  values.push(maxValue);

  return (
    <select value={valueCount} onChange={(event) => {
      const value = parseInt(event.target.value);

      if(!isNaN(value) && onChange) {
        onChange(value);
      }
    }}>
      {values.map(value => <option key={value} value={value}>{value}</option>)}
    </select>
  );
}