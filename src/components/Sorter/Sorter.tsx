import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";

export type SorterProps = {
  data: Array<number>;
}

function* bubbleSort(data: Array<number>) {
  for(let i = 0; i < data.length - 1; i++) {
    let swapped = false;
    for(let j = 0; j < data.length - 1 - i; j++) {
      if(data[j] > data[j+1]) {
        let temp = data[j];
        data[j] = data[j+1];
        data[j+1] = temp;

        swapped = true;
        
        yield [j, j+1];
      }
    }
    if(!swapped) break;
  }

  return;
}

export function Sorter({data}: SorterProps) {

  const values = [];
  for(let i = 0; i < data.length; i++) {
    values[i] = <SorterValue key={i} height={data[i] * 100} width={100/data.length} />
  }

  return (
    <div>
      <div className={styles.Container}>
        {values}
      </div>
      <button onClick={()=>bubbleSort(data)}>Continue</button>
    </div>
  );
}