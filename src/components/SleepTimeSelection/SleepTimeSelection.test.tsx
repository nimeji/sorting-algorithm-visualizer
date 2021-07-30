import { shallow, ShallowWrapper } from "enzyme"
import { SleepTimeSelection } from "./SleepTimeSelection";

const sleepTimes = [1000, 500, 250, 100, 50, 10, 5, 1];

describe('SleepTimeSelection', () => {
  let wrapper: ShallowWrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<SleepTimeSelection sleepTime={1} onChange={onChange} options={sleepTimes} />);
  });

  it('renders the select element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('calls onChange correctly', () => {
    wrapper.find('select').simulate('change', {target: {value: 123.456}});

    expect(onChange).toHaveBeenCalledWith(123.456);
  });

  it('doesnt call onChange with strings', () => {
    wrapper.find('select').simulate('change', {target: {value: 'abc'}});

    expect(onChange).not.toHaveBeenCalled();
  });

  it('displays all options correctly', () => {
    const options = wrapper.find('option');

    options.forEach((option, i) => {
      expect(option.text()).toBe(`${sleepTimes[i]/1000}s`);
      expect(option.props().value).toBe(sleepTimes[i]);
    });
  });
})