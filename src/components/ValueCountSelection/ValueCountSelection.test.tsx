import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";
import { ValueCountSelection } from "./ValueCountSelection";

const maxValue = 1234;
const values: number[] = [];

for(let i = 16; i < maxValue; i *= 2) {
  values.push(i);
}
values.push(maxValue);

describe('ValueCountSelection', () => {
  let wrapper: ShallowWrapper;
  const callback = jest.fn();
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;

  beforeEach(() => {
    wrapper = shallow(<ValueCountSelection valueCount={32} maxValue={maxValue} onChange={callback} />)
    onChange = wrapper.find(LabeledSelect).props().onChange!;
  });

  it('renders the LabeledSelect element', () => {
    expect(wrapper.find(LabeledSelect)).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find(LabeledSelect).children();

    options.forEach((option, i) => {
      expect(option.text()).toBe(values[i].toString());
      expect(option.props().value).toBe(values[i]);
    });
  });

  it('passes the valueCount property to LabeledSelect', () => {
    values.forEach(value => {
      wrapper.setProps({valueCount: value});

      expect(wrapper.find(LabeledSelect).props().value).toBe(value);
    });
  });

  it('calls onChange callback with the correct value', () => {
    values.forEach(value => {
      onChange({target: {value: value.toString()}} as React.ChangeEvent<HTMLSelectElement>);

      expect(callback).toHaveBeenCalledWith(value);
    });
  });

  it('does not call onChange callback with strings', () => {
    onChange({target: {value: 'abc'}} as React.ChangeEvent<HTMLSelectElement>);

    expect(callback).not.toHaveBeenCalled();
  });
});