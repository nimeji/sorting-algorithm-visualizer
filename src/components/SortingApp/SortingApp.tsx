import { useRef, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AlgorithmSelection } from '../AlgorithmSelection/AlgorithmSelection';
import { DataPreset, DataPresetSelection } from '../DataPresetSelection/DataPresetSelection';
import { SleepTimeSelection } from '../SleepTimeSelection/SleepTimeSelection';
import { Sorter } from '../Sorter/Sorter';
import { AlgorithmName } from '../Sorter/SorterAlgorithms';
import { ValueCountSelection } from '../ValueCountSelection/ValueCountSelection';
import styles from './SortingApp.module.scss';

export function SortingApp() {
  const [preset, setPreset] = useState<DataPreset>('shuffled');
  const [data, setData] = useState<Array<number>>([]);
  const [valueCount, setValueCount] = useState(16);
  const [sleepTime, setSleepTime] = useState(500);
  const [maxValues, setMaxValues] = useState(valueCount);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>('BubbleSort');

  const [enableStart, setEnableStart] = useState(true);
  const [enablePause, setEnablePause] = useState(false);

  const sorterRef = useRef<Sorter>(null);

  return (
    <div className={styles.appContainer}>
      <Navbar collapseOnSelect expand="xl" className="navbar-dark bg-secondary">
        <Container fluid>
          <Navbar.Toggle />
          <Navbar.Brand>SAV</Navbar.Brand>
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
                <AlgorithmSelection algorithm={algorithm} onChange={setAlgorithm} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className={styles.sorterContainer}>
        <Sorter 
            ref={sorterRef} 
            data={data} 
            algorithm={algorithm} 
            sleepTime={sleepTime} 
            onMaxValuesChange={setMaxValues} 
            onFinished={() => {
              setEnableStart(false);
              setEnablePause(false);
            }}
        />
      </Container>

      <Nav className={`navbar-dark bg-secondary py-2 ${styles.footer}`}>
          <button
            id="btn-start"
            className="btn btn-success"
            onClick={()=>{
              sorterRef.current?.start()
              setEnableStart(false);
              setEnablePause(true);
            }}
            disabled={!enableStart}
          ><span className="bi bi-play-fill" />Start</button>

          <button 
            id="btn-pause"
            className="btn btn-primary" 
            onClick={()=>{
              sorterRef.current?.pause()
              setEnableStart(true);
              setEnablePause(false);
            }}
            disabled={!enablePause}
          ><span className="bi bi-pause-fill" />Pause</button>

          <button 
            id="btn-reset"
            className="btn btn-danger"
            onClick={()=>{
              sorterRef.current?.reset()
              setEnableStart(true);
              setEnablePause(false);
            }}
          ><span className="bi bi-arrow-counterclockwise" />Reset</button>
      </Nav>
    </div>
  );
}