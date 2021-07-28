import { mount, ReactWrapper } from 'enzyme';
import { SorterValue } from '../SorterValue/SorterValue';
import { Sorter, SorterProps } from './Sorter';
import { SorterLogic } from './SorterLogic';


describe('Sorter', () => {
  let wrapper: ReactWrapper<SorterProps, any, Sorter>;
  let instance: Sorter;
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
  const length = 10;
  const sorted = [0, 1, 2, length - 1];
  const compared: [number, number] = [0, 3];
  const comparisons = 123;
  const accesses = 456;
  const time = 123.456;

  describe('without mocked SorterLogic', () => {
    beforeEach(() => {
      wrapper = mount(<Sorter data={data} delay={0} />);
    });
  
    it('renders correct number of SorterValues', () => {
      expect(wrapper.find(SorterValue).length).toBe(length);
    });
  
    it('has correct width for each SorterValue', () => {
      wrapper.find(SorterValue).forEach(element => {
        expect(element.prop('width')).toBe(100/length);  
      });
    });
  
    it('has correct height for each SorterValue', () => {
      wrapper.find(SorterValue).forEach((element, i) => {
        expect(element.prop('height')).toBe(data[i] * 100);
      });
    });
  
    it('has correct height for each SorterValue after prop change', () => {
      const reverseData = [...data].reverse();
  
      wrapper.setProps({
        data: reverseData,
      });
      
      wrapper.update();
  
      wrapper.find(SorterValue).forEach((element, i) => {
        expect(element.prop('height')).toBe(reverseData[i] * 100);
      });
    });
  });
  
  describe('with mocked SorterLogic', () => {
    let mockStart: jest.SpyInstance
    let mockPause: jest.SpyInstance; 
    let mockUpdate: jest.SpyInstance;

    beforeEach(() => {
      jest.spyOn(SorterLogic.prototype, 'getLastState').mockReturnValue({
        values: [...data], 
        indicesSorted: [...sorted], 
        lastCompared: [...compared], 
        comparisons, 
        accesses
      });
      jest.spyOn(SorterLogic.prototype, 'getSleepTime').mockReturnValue(time);
      jest.spyOn(SorterLogic.prototype, 'getRealTime').mockReturnValue(time);
      mockStart = jest.spyOn(SorterLogic.prototype, 'start').mockImplementation(()=>{});
      mockPause = jest.spyOn(SorterLogic.prototype, 'pause').mockImplementation(()=>{});

      jest.useFakeTimers();

      wrapper = mount(<Sorter data={data} delay={0} />);
      instance = wrapper.instance();
      mockUpdate = jest.spyOn(instance, 'update');
    });

    it('shows the correct SorterValues as Sorted', () => {
      wrapper.find(SorterValue).forEach((element, i) => {
        expect(element.prop('sorted')).toBe(sorted.includes(i));
      });
    });
  
    it('shows the correct SorterValues as selected', () => {
      wrapper.find(SorterValue).forEach((element, i) => {
        expect(element.prop('selected')).toBe(compared.includes(i));
      });
    });
  
    it('shows comparisons correctly', () => {
      expect(wrapper.find('#comparisons').text()).toBe(comparisons.toString());
    });
  
    it('shows accesses correctly', () => {
      expect(wrapper.find('#accesses').text()).toBe(accesses.toString());
    });
  
    it('shows sleepTime correctly', () => {
      expect(wrapper.find('#sleep-time').text()).toBe(time.toFixed(wrapper.prop('decimals')));
    });
  
    it('shows realTime correctly', () => {
      expect(wrapper.find('#real-time').text()).toBe(time.toFixed(wrapper.prop('decimals')));
    });

    it('starts sorting when calling start', () => {
      instance.start();
      expect(mockStart).toHaveBeenCalled();
      jest.advanceTimersToNextTimer(5);
      expect(mockUpdate).toHaveBeenCalledTimes(5);
    });

    it('pauses sorting when calling pause', () => {
      instance.start();
      instance.pause();
      jest.advanceTimersToNextTimer(10);
      expect(mockPause).toHaveBeenCalled();
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it('continues sorting after pause', () => {
      instance.start();
      instance.pause();
      instance.start();
      jest.advanceTimersToNextTimer(10);

      expect(mockUpdate).toHaveBeenCalledTimes(10);
    });

    // it('resets after calling reset', () => {
    //   wrapper.instance().reset();
    //   expect(mockPause).toHaveBeenCalled();
    // });
  });
});
