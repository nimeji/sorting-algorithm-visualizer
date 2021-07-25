import { mount, ReactWrapper } from 'enzyme';
import { SorterValue } from '../SorterValue/SorterValue';
import { Sorter, SorterProps } from './Sorter';

describe('Sorter', () => {
  let wrapper: ReactWrapper<typeof Sorter, SorterProps, {}>
  beforeEach(() => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    wrapper = mount(<Sorter data={data} />)
  });

  it('has correct number of SorterValues', () => {
    expect(wrapper.find(SorterValue).length).toBe(10);
  });

  it('has a valid height for each SorterValue', () => {
    wrapper.find(SorterValue).forEach(element => {
      const height = element.prop('height');
      expect(height).toBeGreaterThanOrEqual(0);
      expect(height).toBeLessThanOrEqual(100);
    });
  });

  it('has correct width for each SorterValue', () => {
    wrapper.find(SorterValue).forEach(element => {
      expect(element.prop('width')).toBe(100/10);  
    });
  });
});