import { shallow, ShallowWrapper } from "enzyme"
import { algorithms } from "../Sorter/SorterAlgorithms";
import { AlgorithmSelection } from "./AlgorithmSelection"

const algorithmNames = Object.keys(algorithms);

describe('AlgorithmSelection', () => {
  let wrapper: ShallowWrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<AlgorithmSelection algorithm="BubbleSort" onChange={onChange} />)
  });

  it('renders the select element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('renders all options correctly', () => {
    const options = wrapper.find('option');

    options.forEach((option, i) => {
      expect(option.text()).toBe(algorithmNames[i]);
      expect(option.props().value).toBe(algorithmNames[i]);
    });
  });

  it('displays the correct algorithm as selected', () => {
    algorithmNames.forEach(name => {
      wrapper.setProps({algorithm: name});
      expect(wrapper.find('select').props().value).toBe(name);
    });
  });

  it('calls onChange with correct algorithm name', () => {
    algorithmNames.forEach(name => {
      wrapper.find('select').simulate('change', {target: {value: name}})
      expect(onChange).toHaveBeenCalledWith((name));
    });
  });

  it('does not call onChange with incorrect algorithm name', () => {
    wrapper.find('select').simulate('change', {target: {value: 'abc'}});
    expect(onChange).not.toHaveBeenCalledWith('abc');
  });
});