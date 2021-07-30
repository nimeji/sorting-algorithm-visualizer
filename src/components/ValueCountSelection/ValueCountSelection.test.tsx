import { shallow, ShallowWrapper } from "enzyme";
import { ValueCountSelection } from "./ValueCountSelection";

const maxValue = 1234;
const values: number[] = [];

for(let i = 16; i < maxValue; i *= 2) {
  values.push(i);
}
values.push(maxValue);

describe('ValueCountSelection', () => {
  let wrapper: ShallowWrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ValueCountSelection valueCount={32} maxValue={maxValue} onChange={onChange} />)
  });

  it('renders the select element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find('option');

    options.forEach((option, i) => {
      expect(option.text()).toBe(values[i].toString());
      expect(option.props().value).toBe(values[i]);
    });
  });

  it('displays the correct count as selected', () => {
    values.forEach(value => {
      wrapper.setProps({valueCount: value});

      expect(wrapper.find('select').props().value).toBe(value);
    });
  });

  it('calls onChange with the correct value', () => {
    values.forEach(value => {
      wrapper.find('select').simulate('change', {target: {value: value.toString()}});

      expect(onChange).toHaveBeenCalledWith(value);
    });
  });

  it('does not call onChange with strings', () => {
    wrapper.find('select').simulate('change', {target: {value: 'abc'}});

    expect(onChange).not.toHaveBeenCalled();
  })
});