import { shallow, ShallowWrapper } from "enzyme"
import { LabeledSelect } from "./LabeledSelect"

describe('LabeledSelect', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<LabeledSelect />)
  });

  it('does not render the text if no text is given', () => {
    wrapper.setProps({text: undefined});
    expect(wrapper.find('span')).toHaveLength(0);
  });

  it('renders the correct text', () => {
    wrapper.setProps({text: 'abc'});
    expect(wrapper.find('label').text()).toBe('abc');
  });

  it('renders the select element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('correctly passes value to the select element', () => {
    wrapper.setProps({value: 123});
    expect(wrapper.find('select').props().value).toBe(123);
  });

  it('correctly passes the onChange callback to the select element', () => {
    const callback = jest.fn();
    wrapper.setProps({onChange: callback});
    expect(wrapper.find('select').props().onChange).toBe(callback);
  });

  it('corretly passes the disabled prop to the select element', () => {
    expect(wrapper.find('select').props().disabled).toBeFalsy();
    wrapper.setProps({disabled: true});
    expect(wrapper.find('select').props().disabled).toBeTruthy();
  })

  it.skip('renders children correctly', () => {
    //todo
  });
});