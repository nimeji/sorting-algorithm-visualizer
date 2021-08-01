import { shallow, ShallowWrapper } from "enzyme"
import React from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";
import { SleepTimeSelection } from "./SleepTimeSelection";

const sleepTimes = [1000, 500, 250, 100, 50, 10, 5, 1];

describe('SleepTimeSelection', () => {
  let wrapper: ShallowWrapper;
  const callback = jest.fn();
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;

  beforeEach(() => {
    wrapper = shallow(<SleepTimeSelection sleepTime={1} onChange={callback} options={sleepTimes} />);
    onChange = wrapper.find(LabeledSelect).props().onChange!;
  });

  it('renders the LabeledSelect element', () => {
    expect(wrapper.find(LabeledSelect)).toHaveLength(1);
  });

  it('calls onChange callback correctly', () => {
    onChange({target: {value: "123.456"}} as React.ChangeEvent<HTMLSelectElement>);

    expect(callback).toHaveBeenCalledWith(123.456);
  });

  it('doesnt call onChange callback with strings', () => {
    onChange({target: {value: 'abc'}} as React.ChangeEvent<HTMLSelectElement>);

    expect(callback).not.toHaveBeenCalled();
  });

  it('displays all options correctly', () => {
    const options = wrapper.find(LabeledSelect).children();

    options.forEach((option, i) => {
      expect(option.text()).toBe(`${sleepTimes[i]}ms`);
      expect(option.props().value).toBe(sleepTimes[i]);
    });
  });
})