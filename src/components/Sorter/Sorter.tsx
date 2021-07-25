import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export type SorterProps = {
  data: Array<number>;
}

function cloneArray(array: Array<any>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

function* bubbleSort(array: Array<number>, swap: (i: number, j: number) => void) {
  console.log(array, swap);
  for(let i = 0; i < array.length - 1; i++) {
    let swapped = false;
    for(let j = 0; j < array.length - 1 - i; j++) {
      console.log(i, j, array[j], array[j+1], array.length);
      if(array[j] > array[j+1]) {
        swap(j, j+1);

        swapped = true;
        console.log('swap', array);
      }
      [array, swap] = yield [j, j+1];
    }
    if(!swapped) break;
  }

  return;
}

export function Sorter({data}: SorterProps) {

  const [values, setValues] = useState<Array<number>>([]);
  const [generator, setGenerator] = useState<Generator>();
  const [compared, setCompared] = useState<[number, number]>([-1, -1]);

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
    elements[i] = <SorterValue key={i} height={values[i] * 100} width={100/values.length} />
  }

  return (
    <div>
      <div className={styles.Container}>
        {elements}
      </div>
      <button onClick={()=>{
        if(generator) generator.next([values, swap]);
      }}>Continue</button>
    </div>
  );
}