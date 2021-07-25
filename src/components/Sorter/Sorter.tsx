import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export type SorterProps = {
  data: number[];
}

function cloneArray(array: Array<any>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

function* bubbleSort(array: number[], swap: (i: number, j: number) => void) {
  let sorted: number[] = [];

  for(let i = 0; i < array.length - 1; i++) {
    let j;
    for(j = 0; j < array.length - 1 - i; j++) {
      [array, swap] = yield [j, j+1, sorted];
      if(array[j] > array[j+1]) {
        swap(j, j+1);
      }
    }
    sorted = [j, ...sorted];
  }
  sorted = [0, ...sorted];
  yield [undefined, undefined, sorted];

  return;
}

export function Sorter({data}: SorterProps) {

  const [values, setValues] = useState<Array<number>>([]);
  const [generator, setGenerator] = useState<Generator>();
  const [compared, setCompared] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const swap = useCallback((i: number, j: number) => {
    const temp = cloneArray(values);

    [temp[i], temp[j]] = [temp[j], temp[i]];

    setValues(temp);
  }, [values]);

  useEffect(() => {
    setValues(cloneArray(data));
    setGenerator(undefined);
  }, [data]);

  useEffect(() => {
    if(values.length > 0 && !generator)
      setGenerator(bubbleSort(values, swap));
  }, [values, generator, swap]);

  const elements = [];
  for(let i = 0; i < values.length; i++) {
    elements[i] = <SorterValue 
      key={i} 
      height={values[i] * 100} 
      width={100/values.length} 
      selected={compared.includes(i)}
      sorted={sorted.includes(i)}
    />
  }

  return (
    <div>
      <div className={styles.Container}>
        {elements}
      </div>
      <button 
        onClick={()=>{
          if(generator) {
            const result = generator.next([values, swap]).value;

            if(result){
              const [i, j, sorted] = result;
              setCompared([i, j]);
              setSorted(sorted);
            } else {
              setCompared([undefined, undefined]);
              setButtonDisabled(true);
            }
          };
        }}
        disabled={buttonDisabled}
      >Continue</button>
    </div>
  );
}