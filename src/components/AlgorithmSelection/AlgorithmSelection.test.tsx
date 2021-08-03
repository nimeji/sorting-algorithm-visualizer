import { shallow, ShallowWrapper } from "enzyme"
import React from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";
import { algorithms } from "../Sorter/SorterAlgorithms";
import { AlgorithmSelection } from "./AlgorithmSelection"

const algorithmNames = Object.keys(algorithms);

describe('AlgorithmSelection', () => {
  let wrapper: ShallowWrapper;
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;
  const callback = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<AlgorithmSelection algorithm="BubbleSort" onChange={callback} />)
    onChange = wrapper.find(LabeledSelect).props().onChange!;
  });

  it('renders the LabeledSelect element', () => {
    expect(wrapper.find(LabeledSelect)).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find(LabeledSelect).children();

    options.forEach((option, i) => {
      expect(option.text()).toBe(algorithmNames[i]);
      expect(option.props().value).toBe(algorithmNames[i]);
    });
  });

  it('passes the algorithm to LabeledSelect', () => {
    algorithmNames.forEach(name => {
      wrapper.setProps({algorithm: name});
      expect(wrapper.find(LabeledSelect).props().value).toBe(name);
    });
  });

  it('calls onChange callback with correct algorithm name', () => {
    algorithmNames.forEach(name => {
      onChange({target: {value: name}} as React.ChangeEvent<HTMLSelectElement>)
      expect(callback).toHaveBeenCalledWith((name));
    });
  });

  it('does not call onChange callback with incorrect algorithm name', () => {
    onChange({target: {value: 'abc'}} as React.ChangeEvent<HTMLSelectElement>)
    expect(callback).not.toHaveBeenCalled();
  });
});