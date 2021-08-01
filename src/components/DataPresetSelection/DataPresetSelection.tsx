import { useEffect } from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";

type DataPresetSelectionProps = {
  count: number;
  preset?: DataPreset;
  onPresetChange?: (preset: DataPreset) => void;
  onDataChange?: (data: number[]) => void;
};

export type DataPreset = keyof typeof dataGenerators;

function shuffleFisherYates(array: Array<number>) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }

  return array;
}

function sortedData(count: number) {
  const result: number[] = [];

  for(let i=0; i<count; i++) {
    result[i] = 1/count * (i+1);
  }

  return result;
}

function reverseSortedData(count: number) {
  return sortedData(count).reverse();
}

function shuffledData(count: number) {
  return shuffleFisherYates(sortedData(count));
}

function fewUniqueData(count: number, uniques: number = 16) {
  const result: number[] = [];

  for(let i = 1; i <= uniques; i++) {
    while (result.length < count/uniques * i) {
      result.push(i/uniques);
    }
  }

  return shuffleFisherYates(result);
}

const dataGenerators = {
  shuffled: shuffledData,
  sorted: sortedData,
  reverseSorted: reverseSortedData,
  fewUnique: fewUniqueData,
}

export const dataPresets = Object.keys(dataGenerators) as DataPreset[];

export function DataPresetSelection({count, preset='shuffled', onPresetChange, onDataChange}: DataPresetSelectionProps) {
  useEffect(() => {
    if(onDataChange) onDataChange(dataGenerators[preset](count));
  }, [preset, count, onDataChange]);

  return (
    <LabeledSelect text="Data Preset" value={preset} onChange={(event) => {
      if(onPresetChange) {
        const preset = event.target.value as DataPreset;
        onPresetChange(preset);
      }
    }}>
      <option value="shuffled">Shuffled</option>
      <option value="sorted">Sorted</option>
      <option value="reverseSorted">Reverse Sorted</option>
      <option value="fewUnique">Few Unique</option>
    </LabeledSelect>
  );
}