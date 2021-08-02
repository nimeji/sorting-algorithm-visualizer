import { mount, ReactWrapper } from "enzyme"
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";
import { WindowNumberSelect } from "./WindowNumberSelect"

describe('WindowNumberSelect', () => {
  let wrapper: ReactWrapper;
  const callback = jest.fn();
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;

  beforeEach(() => {
    wrapper = mount(<WindowNumberSelect number={3} onChange={callback} />);
  });

  it('renders the LabeledSelect element', () => {
    expect(wrapper.find(LabeledSelect)).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find(LabeledSelect).find('option');

    options.forEach((option, i) => {
      expect(option.props().value).toBe(i);
      expect(option.text()).toBe(i.toString());
    });
  });

  it('does not throw an error without a callback', () => {
    wrapper.setProps({onChange: undefined});
    onChange = wrapper.find(LabeledSelect).props().onChange!;

    expect(() => onChange({target: {value: '5'}} as React.ChangeEvent<HTMLSelectElement>)).not.toThrow();
  });

  describe('callback', () => {
    beforeEach(() => {
      onChange = wrapper.find(LabeledSelect).props().onChange!;
    });

    it('calls the onChange callback correctly', () => {
      onChange({target: {value: '5'}} as React.ChangeEvent<HTMLSelectElement>);

      expect(callback).toHaveBeenCalledWith(5);
    });

    it('does not call onChange callback with strings', () => {
      onChange({target: {value: 'abc'}} as React.ChangeEvent<HTMLSelectElement>);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});