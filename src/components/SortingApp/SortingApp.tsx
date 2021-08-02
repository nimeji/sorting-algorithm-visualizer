import { createRef, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { AlgorithmSelection } from '../AlgorithmSelection/AlgorithmSelection';
import { DataPreset, DataPresetSelection } from '../DataPresetSelection/DataPresetSelection';
import { SleepTimeSelection } from '../SleepTimeSelection/SleepTimeSelection';
import { Sorter } from '../Sorter/Sorter';
import { AlgorithmName, algorithmNames } from '../Sorter/SorterAlgorithms';
import { ValueCountSelection } from '../ValueCountSelection/ValueCountSelection';
import { WindowNumberSelect } from '../WindowNumberSelect/WindowNumberSelect';
import styles from './SortingApp.module.scss';

export function SortingApp() {
  const [preset, setPreset] = useState<DataPreset>('shuffled');
  const [data, setData] = useState<Array<number>>([]);
  const [valueCount, setValueCount] = useState(16);
  const [sleepTime, setSleepTime] = useState(500);
  const [maxValues, setMaxValues] = useState(valueCount);
  const [numWindows, setNumWindows] = useState(1);

  const [algorithms, setAlgorithms] = useState<AlgorithmName[]>([...algorithmNames]);

  const setAlgorithm = useCallback((i: number, value: AlgorithmName) => {
    setAlgorithms((previous) => {
      const temp = [...previous];
      temp[i] = value;

      return temp;
    })
  }, [setAlgorithms]);

  const sorterRef = useRef<RefObject<Sorter>[]>([]);

  for(let i = 0; i<8; i++) {
    sorterRef.current[i] = sorterRef.current[i] ?? createRef<Sorter>();
  }

  const windows = useMemo(() => {
    const temp = [];
    
    for(let i = 0; i<numWindows; i++) {
      temp[i] = (
        <div key={i} className={`${styles.sorterContainer} col-xl-6`} style={{height: '400px'}}>
          <div className={styles.algorithmSelection} >
            <AlgorithmSelection algorithm={algorithms[i]} onChange={(algorithm) => setAlgorithm(i, algorithm)} />
          </div>
          <Sorter 
            ref={sorterRef.current[i]} 
            data={data} 
            algorithm={algorithms[i]} 
            sleepTime={sleepTime} 
            onMaxValuesChange={setMaxValues} 
          />
        </div>
      );
    }

    return temp;
  }, [numWindows, algorithms, data, setAlgorithm, sleepTime]);

  return (
    <div className={styles.appContainer}>
      <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-secondary">
        <Container fluid>
          <Navbar.Toggle />
          <Navbar.Brand>S-A-V</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="w-100 justify-content-center">
              <Nav.Item>
                <DataPresetSelection preset={preset} onPresetChange={setPreset} onDataChange={setData} count={valueCount} />
              </Nav.Item>
              <Nav.Item>
                <ValueCountSelection valueCount={valueCount} maxValue={maxValues} onChange={setValueCount} />
              </Nav.Item>
              <Nav.Item>
                <SleepTimeSelection sleepTime={sleepTime} onChange={setSleepTime} options={[500, 250, 100, 50, 25, 10, 5, 1]} />
              </Nav.Item>
              <Nav.Item>
                <WindowNumberSelect number={numWindows} onChange={setNumWindows} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {windows}
        </Row>
      </Container>
      <Nav className="fixed-bottom navbar-dark bg-secondary py-2">
        <Container>
          <button 
            className="btn btn-success"
            onClick={()=>sorterRef.current?.forEach(ref => ref.current?.start())}
          ><span className="bi bi-play-fill" /> Start</button>

          <button 
            className="btn btn-primary" 
            onClick={()=>sorterRef.current?.forEach(ref => ref.current?.pause())}
          ><span className="bi bi-pause-fill" /> Pause</button>

          <button 
            className="btn btn-danger"
            onClick={()=>sorterRef.current?.forEach(ref => ref.current?.reset())}
          ><span className="bi bi-arrow-counterclockwise" /> Reset</button>
        </Container>
      </Nav>
    </div>
  );
}