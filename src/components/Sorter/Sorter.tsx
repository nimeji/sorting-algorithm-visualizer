import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export type SorterProps = {
  data: number[];
  decimals?: number;
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
  let comparisions = 0;
  let accesses = 0;

  for(let i = 0; i < array.length - 1; i++) {
    let j;
    for(j = 0; j < array.length - 1 - i; j++) {
      comparisions += 1;
      accesses += 2;
      [array, swap] = yield [j, j+1, sorted, comparisions, accesses];

      if(array[j] > array[j+1]) {
        accesses += 4;
        swap(j, j+1);
      }
    }
    sorted = [j, ...sorted];
  }
  sorted = [0, ...sorted];
  yield [undefined, undefined, sorted, comparisions, accesses];

  return;
}

export function Sorter({data, decimals=1}: SorterProps) {

  const [values, setValues] = useState<Array<number>>([]);
  const [generator, setGenerator] = useState<Generator>();
  const [compared, setCompared] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [performanceTimer, setPerformanceTimer] = useState<number>(performance.now());
  const [realTime, setRealTime] = useState(0);
  const [sleepTime, setSleepTime] = useState(0);
  const [comparisions, setComparisions] = useState(0);
  const [arrayAccesses, setArrayAccesses] = useState(0);

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

  const runNext = () => {
    if(generator) {
      const sleep = performance.now() - performanceTimer - realTime
      const result = generator.next([values, swap]).value;
      setSleepTime(sleep);
      setRealTime(performance.now() - performanceTimer - sleep);


      if(result){
        const [i, j, sorted, comp, acc] = result;

        setCompared([i, j]);
        setSorted(sorted);
        setComparisions(comp);
        setArrayAccesses(acc);
      } else {
        setCompared([undefined, undefined]);
        setButtonDisabled(true);
      }
    };
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ValueContainer}>
        {elements}
      </div>
      <div className={styles.Metrics}>
        <div id="comparisions">Comparisons: <span>{comparisions}</span></div>
        <div id="accesses">Array Accesses: <span>{arrayAccesses}</span></div>
        <div id="real-time">Real Time: <span>{realTime.toFixed(decimals)}</span>ms</div>
        <div id="sleep-time">Sleep Time: <span>{sleepTime.toFixed(decimals)}</span>ms</div>
      </div>

      <button 
        onClick={runNext}
        disabled={buttonDisabled}
      >Continue</button>
    </div>
  );
}