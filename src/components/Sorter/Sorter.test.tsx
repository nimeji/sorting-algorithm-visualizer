import { mount, ReactWrapper } from 'enzyme';
import { SorterValue } from '../SorterValue/SorterValue';
import { Sorter, SorterProps } from './Sorter';

describe('Sorter initial', () => {
  let wrapper: ReactWrapper<typeof Sorter, SorterProps, {}>
  let length: number;

  beforeEach(() => {
    const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
    length = data.length;
    wrapper = mount(<Sorter data={data} />)
  });

  it('has correct number of SorterValues', () => {
    expect(wrapper.find(SorterValue).length).toBe(length);
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
      expect(element.prop('width')).toBe(100/length);  
    });
  });

  it('disables the button when sorting is done', ()=>{
    for(let i = 0; i < 10000; i++) {
      wrapper.find('button').simulate('click');
    }
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  
});

describe('Sorter after sorting', () => {
  let wrapper: ReactWrapper<typeof Sorter, SorterProps, {}>

  beforeAll(() => {
    const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
    wrapper = mount(<Sorter data={data} />);

    while(wrapper.find('button').prop('disabled') === false) {
      wrapper.find('button').simulate('click');
    }
  });

  it('results in a sorted list', () => {
    const values = wrapper.find(SorterValue);
    for(let i=0; i < values.length - 1; i++) {
      expect(values.at(i).prop('height')).toBeLessThanOrEqual(values.at(i+1).prop('height'))
    }    
  });

  it('marks the list as sorted', () => {
    const values = wrapper.find(SorterValue);
    for(let i=0; i < values.length; i++) {
      expect(values.at(i).prop('sorted')).toBeTruthy();
    }    
  });

  it('displays a non zero time after sorting', () => {
    const value = parseInt(wrapper.find('#real-time').find('span').text());
    expect(value).not.toBeNaN();
    expect(value).toBeGreaterThan(0);
  });

  it('displays non zero array accesses after sorting', () => {
    const value = parseInt(wrapper.find('#accesses').find('span').text());
    expect(value).not.toBeNaN();
    expect(value).toBeGreaterThan(0);
  });

  it('displays non zero comparisons after sorting', () => {
    const value = parseInt(wrapper.find('#comparisions').find('span').text());
    expect(value).not.toBeNaN();
    expect(value).toBeGreaterThan(0);
  });

  it('displays a positive sleep time after sorting', () => {
    const value = parseInt(wrapper.find('#sleep-time').find('span').text());
    expect(value).not.toBeNaN();
    expect(value).toBeGreaterThanOrEqual(0);
  })
});