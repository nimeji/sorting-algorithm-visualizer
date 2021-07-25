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

  it('has the Selected class if selected', () => {
    expect(wrapper.hasClass('Selected')).toBeFalsy();
    wrapper.setProps({selected: true});
    expect(wrapper.hasClass('Selected')).toBeTruthy();
  });

  it('has the Sorted class if sorted', () => {
    expect(wrapper.hasClass('Sorted')).toBeFalsy();
    wrapper.setProps({sorted: true});
    expect(wrapper.hasClass('Sorted')).toBeTruthy();
  });
});