import { shallow, ShallowWrapper } from 'enzyme';
import { SorterValue, SorterValueProps } from './SorterValue';

describe('SorterValue', () => {
  let wrapper: ShallowWrapper<SorterValueProps, {}, React.Component<{}, {}, any>>;
  
  beforeEach(() => {
    wrapper = shallow(<SorterValue height={66} width={66} />);
  });

  it('has correct height', () => {
    expect(wrapper.find('div').prop('style')).toHaveProperty('height', `66%`)
  });

  it('has correct width', () => {
    expect(wrapper.find('div').prop('style')).toHaveProperty('width', '66%');
  });

  it('only has the default class', () => {
    expect(wrapper.hasClass('default')).toBeTruthy();
    expect(wrapper.hasClass('selected')).toBeFalsy();
    expect(wrapper.hasClass('sorted')).toBeFalsy();
  });

  it('only has the selected class if selected', () => {
    wrapper.setProps({selected: true});
    expect(wrapper.hasClass('default')).toBeFalsy();
    expect(wrapper.hasClass('selected')).toBeTruthy();
    expect(wrapper.hasClass('sorted')).toBeFalsy();
  });

  it('has the sorted class if sorted', () => {
    wrapper.setProps({sorted: true});
    expect(wrapper.hasClass('default')).toBeFalsy();
    expect(wrapper.hasClass('selected')).toBeFalsy();
    expect(wrapper.hasClass('sorted')).toBeTruthy();
  });

  it('only has selected class if sorted and selected', () => {
    wrapper.setProps({sorted: true, selected: true});
    expect(wrapper.hasClass('default')).toBeFalsy();
    expect(wrapper.hasClass('selected')).toBeTruthy();
    expect(wrapper.hasClass('sorted')).toBeFalsy();
  })
});