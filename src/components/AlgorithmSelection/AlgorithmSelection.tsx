import { AlgorithmName, algorithms } from "../Sorter/SorterAlgorithms";

type AlgorithmSelectionProps = {
  algorithm: AlgorithmName
  onChange?: (algorithm: AlgorithmName) => void
  disabled?: boolean,
}

const algorithmNameList = Object.keys(algorithms);

export function AlgorithmSelection({algorithm, onChange, disabled=false}: AlgorithmSelectionProps) {

  return (
    <select name="Algorithm" value={algorithm} disabled={disabled} onChange={(event) => {
      const value = event.target.value;

      if(algorithmNameList.includes(value))
        if(onChange) onChange(value as AlgorithmName);
    }}>
      {algorithmNameList.map(name => <option key={name} value={name}>{name}</option>)}
    </select>
  );
}