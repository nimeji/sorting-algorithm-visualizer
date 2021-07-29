import { useEffect, useState } from 'react';
import { Sorter } from './components/Sorter/Sorter';

function shuffleFisherYates(array: Array<number>) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }

  return array;
}

function App() {
  const [data, setData] = useState<Array<number>>([]);

  useEffect(() => {
    const temp = [];
    const len = 100;
    for(let i=0; i<len; i++) {
      temp[i] = 1/len * (i+1);
    }
    shuffleFisherYates(temp);
    setData(temp);
  }, []);

  return (
    <div>
      <Sorter data={data} algorithm="QuickSort" run={true} sleepTime={10} />
    </div>
  );
}

export default App;
