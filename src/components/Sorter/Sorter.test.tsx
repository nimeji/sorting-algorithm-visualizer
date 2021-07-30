import { shallow, ShallowWrapper } from 'enzyme';
import { Canvas } from '../Canvas/Canvas';
import { Sorter } from './Sorter';
import { SorterLogic } from './SorterLogic';

/*
  Testing this module would require mocking the canvas context - too much work for now
*/

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
  })

  it('passes a draw function to the canvas', ()=>{
    expect(typeof wrapper.find(Canvas).props().draw).toBe('function');
  });

  describe.skip('without mocked SorterLogic', () => {
    it('renders correct number of SorterValues', () => {
      // todo
    });
  
    it('has correct width for each SorterValue', () => {
      // todo
    });
  
    it('has correct height for each SorterValue', () => {
      // todo
    });
  
    it('has correct height for each SorterValue after prop change', () => {
      // todo
    });
  });
  
  describe('with mocked SorterLogic', () => {
    let mockStart: jest.SpyInstance
    let mockPause: jest.SpyInstance; 

    beforeEach(() => {
      // jest.spyOn(SorterLogic.prototype, 'getLastState').mockReturnValue({
      //   values: [...data], 
      //   indicesSorted: new Set(sorted), 
      //   lastCompared: [...compared], 
      //   comparisons, 
      //   accesses
      // });
      // jest.spyOn(SorterLogic.prototype, 'getSleepTime').mockReturnValue(time);
      // jest.spyOn(SorterLogic.prototype, 'getRealTime').mockReturnValue(time);
      mockStart = jest.spyOn(SorterLogic.prototype, 'start').mockImplementation(()=>{});
      mockPause = jest.spyOn(SorterLogic.prototype, 'pause').mockImplementation(()=>{});
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
      expect(mockStart).toHaveBeenCalled();
    });

    it('pauses sorting when calling pause', () => {
      instance.pause();
      expect(mockPause).toHaveBeenCalled();
    });

    it('continues sorting after pause', () => {
      instance.start();
      instance.pause();
      expect(mockStart).toHaveBeenCalledTimes(1);
      instance.start();
      expect(mockStart).toHaveBeenCalledTimes(2);
    });

    it('indicates correctly whether the algorithm is running', () => {
      const mockIsRunning = jest.spyOn(SorterLogic.prototype, 'isRunning').mockReturnValue(true);
      expect(instance.isRunning()).toBeTruthy();
      mockIsRunning.mockReturnValue(false);
      expect(instance.isRunning()).toBeFalsy();
    });

    it('indicates correctly whether the algorithm is finished', () => {
      const mockIsFinished = jest.spyOn(SorterLogic.prototype, 'isFinished').mockReturnValue(true);
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
      const mockSetDelay = jest.spyOn(SorterLogic.prototype, 'setDelay');
      expect(mockSetDelay).not.toHaveBeenCalled();
      wrapper.setProps({
        sleepTime: 1234,
      });
      expect(mockSetDelay).toHaveBeenCalled();
    });
  });
});
