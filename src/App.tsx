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
    
    for(let i=0; i<10; i++) {
      temp[i] = 1/10 * (i+1);
    }
    shuffleFisherYates(temp);
    setData(temp);
  }, [])

  return (
    <div>
      <Sorter data={data} />
    </div>
  );
}

export default App;
