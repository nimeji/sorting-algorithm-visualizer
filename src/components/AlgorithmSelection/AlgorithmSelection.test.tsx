import { shallow, ShallowWrapper } from "enzyme"
import React from "react";
import { algorithms } from "../Sorter/SorterAlgorithms";
import { AlgorithmSelection } from "./AlgorithmSelection"

const algorithmNames = Object.keys(algorithms);

describe('AlgorithmSelection', () => {
  let wrapper: ShallowWrapper;
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;
  const callback = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<AlgorithmSelection algorithm="BubbleSort" onChange={callback} />)
    onChange = wrapper.find('select').props().onChange!;
  });

  it('renders the select element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find('select').children();

    options.forEach((option, i) => {
      expect(option.text()).toBe(algorithmNames[i]);
      expect(option.props().value).toBe(algorithmNames[i]);
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