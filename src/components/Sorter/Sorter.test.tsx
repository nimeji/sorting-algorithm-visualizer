import { shallow, ShallowWrapper } from 'enzyme';
import { Canvas } from '../Canvas/Canvas';
import { Sorter } from './Sorter';
import { SorterLogic } from './SorterLogic';

/*
  Testing this module with 100% coverage would require mocking the canvas context - too much work for now
*/

jest.mock('./SorterLogic');
const MockedSorterLogic = SorterLogic as jest.Mocked<typeof SorterLogic>

describe('Sorter', () => {
  let wrapper: ShallowWrapper<any, any, Sorter>;
  let instance: Sorter;
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
  // const length = 10;
  // const sorted = [0, 1, 2, length - 1];
  // const compared: [number, number] = [0, 3];
  // const comparisons = 123;
  // const accesses = 456;
  // const time = 123.456;

  beforeEach(() => {
    wrapper = shallow(<Sorter data={data} />);
    instance = wrapper.instance();
  });

  it('renders the canvas', () => {
    expect(wrapper.find(Canvas)).toHaveLength(1);
  });

  it('passes a draw function to the canvas', ()=>{
    expect(typeof wrapper.find(Canvas).props().draw).toBe('function');
  });

  it('passes a redraw function to the canvas', () => {
    expect(typeof wrapper.find(Canvas).props().redraw).toBe('function');
  });

  it.skip('renders correct number of SorterValues', () => {
    // todo
  });

  it.skip('has correct width for each SorterValue', () => {
    // todo
  });

  it.skip('has correct height for each SorterValue', () => {
    // todo
  });

  it.skip('has correct height for each SorterValue after prop change', () => {
    // todo
  });

  it.skip('shows the correct SorterValues as Sorted', () => {
    // todo
  });

  it.skip('shows the correct SorterValues as selected', () => {
    // todo
  });

  it.skip('shows comparisons correctly', () => {
    // todo
  });

  it.skip('shows accesses correctly', () => {
    // todo
  });

  it.skip('shows sleepTime correctly', () => {
    // todo
  });

  it.skip('shows realTime correctly', () => {
    // todo
  });

  it('starts sorting when calling start', () => {
    instance.start();
    expect(MockedSorterLogic.prototype.start).toHaveBeenCalled();
  });

  it('pauses sorting when calling pause', () => {
    instance.pause();
    expect(MockedSorterLogic.prototype.pause).toHaveBeenCalled();
  });

  it('continues sorting after pause', () => {
    instance.start();
    instance.pause();
    expect(MockedSorterLogic.prototype.start).toHaveBeenCalledTimes(1);
    instance.start();
    expect(MockedSorterLogic.prototype.start).toHaveBeenCalledTimes(2);
  });

  it('indicates correctly whether the algorithm is running', () => {
    const mockIsRunning = MockedSorterLogic.prototype.isRunning as jest.Mock 
    mockIsRunning.mockReturnValue(true);
    expect(instance.isRunning()).toBeTruthy();
    mockIsRunning.mockReturnValue(false);
    expect(instance.isRunning()).toBeFalsy();
  });

  it('indicates correctly whether the algorithm is finished', () => {
    const mockIsFinished = MockedSorterLogic.prototype.isFinished as jest.Mock

    mockIsFinished.mockReturnValue(true);
    expect(instance.isFinished()).toBeTruthy();
    mockIsFinished.mockReturnValue(false);
    expect(instance.isFinished()).toBeFalsy();
  });

  it('resets after calling reset', () => {
    const prevLogic = instance.state.logic;
    wrapper.instance().reset();
    expect(instance.state.logic).not.toBe(prevLogic);
  });

  it('resets when data or algorithm changes', () => {
    const mockReset = jest.spyOn(instance, 'reset');
    const algorithm = 'QuickSort';

    expect(algorithm).not.toBe(Sorter.defaultProps.algorithm);
    expect(mockReset).not.toHaveBeenCalled();
    wrapper.setProps({
      algorithm
    });
    expect(mockReset).toHaveBeenCalledTimes(1);
    wrapper.setProps({
      data: [...data],
    });
    expect(mockReset).toHaveBeenCalledTimes(2);
  });

  it('sets the delay when sleepTime changes', () => {
    expect(MockedSorterLogic.prototype.setDelay).not.toHaveBeenCalled();
    wrapper.setProps({
      sleepTime: 1234,
    });
    expect(MockedSorterLogic.prototype.setDelay).toHaveBeenCalled();
  });
});
