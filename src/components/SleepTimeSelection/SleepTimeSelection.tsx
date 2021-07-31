type SleepTimeSelectionProps = {
  sleepTime: number
  options: number[];
  onChange?: (sleepTime: number) => void;
};

export function SleepTimeSelection({sleepTime, options, onChange}: SleepTimeSelectionProps) {
  return(
    <select value={sleepTime} onChange={(event) => {
      const value = parseFloat(event.target.value);

      if(onChange && !isNaN(value)) {
        onChange(value);
      }
    }}>
      {options.map(value => <option key={value} value={value}>{value}ms</option>)}
    </select>
  );
}