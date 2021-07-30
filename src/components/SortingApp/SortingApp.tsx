import { useEffect, useState } from 'react';
import { AlgorithmSelection } from '../AlgorithmSelection/AlgorithmSelection';
import { Sorter } from '../Sorter/Sorter';
import { ValueCountSelection } from '../ValueCountSelection/ValueCountSelection';

function shuffleFisherYates(array: Array<number>) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }

  return array;
}

export function SortingApp() {
  const [data, setData] = useState<Array<number>>([]);

  useEffect(() => {
    const temp = [];
    const len = 1000;
    for(let i=0; i<len; i++) {
      temp[i] = 1/len * (i+1);
    }
    shuffleFisherYates(temp);
    setData(temp);
  }, []);

  return (
    <div>
      <ValueCountSelection valueCount={32} maxValue={1234} />
      <AlgorithmSelection algorithm="BubbleSort" />
      <Sorter data={data} algorithm="HeapSort" run={true} sleepTime={1}/>
    </div>
  );
}