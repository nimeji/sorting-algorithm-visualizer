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
  })
});