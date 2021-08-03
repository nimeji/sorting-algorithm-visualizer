import { shallow, ShallowWrapper } from "enzyme"
import { AlgorithmSelection } from "../AlgorithmSelection/AlgorithmSelection";
import { DataPresetSelection } from "../DataPresetSelection/DataPresetSelection";
import { SleepTimeSelection } from "../SleepTimeSelection/SleepTimeSelection";
import { Sorter } from "../Sorter/Sorter";
import { ValueCountSelection } from "../ValueCountSelection/ValueCountSelection";
import { SortingApp } from "./SortingApp"

describe('SortingApp', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SortingApp />)
  });

  it('renders the DataPresetSelection', () => {
    expect(wrapper.find(DataPresetSelection)).toHaveLength(1);
  });

  it('renders the ValueCountSelection', () => {
    expect(wrapper.find(ValueCountSelection)).toHaveLength(1);
  });

  it('renders the SleepTimeSelection', () => {
    expect(wrapper.find(SleepTimeSelection)).toHaveLength(1);
  });

  it('renders the AlgorithmSelection', () => {
    expect(wrapper.find(AlgorithmSelection)).toHaveLength(1);
  });
  
  it('renders the sorter', () => {
    expect(wrapper.find(Sorter)).toHaveLength(1);
  });

  it('renders the start button', () => {
    expect(wrapper.find('#btn-start').text()).toBe('Start');
  });

  it('renders the pause button', () => {
    expect(wrapper.find('#btn-pause').text()).toBe('Pause');
  });

  it('renders the reset button', () => {
    expect(wrapper.find('#btn-reset').text()).toBe('Reset');
  });

  it('has start button enabled and pause button disabled initially', () => {
    expect(wrapper.find('#btn-start').props().disabled).toBeFalsy();
    expect(wrapper.find('#btn-pause').props().disabled).toBeTruthy();
  });

  it('has start button disabled and pause button enabled after pressing start', () => {
    wrapper.find('#btn-start').simulate('click');

    expect(wrapper.find('#btn-start').props().disabled).toBeTruthy();
    expect(wrapper.find('#btn-pause').props().disabled).toBeFalsy();
  });

  it('has start button enabled and pause button disabled after pressing pause', () => {
    wrapper.find('#btn-start').simulate('click');
    wrapper.find('#btn-pause').simulate('click');

    expect(wrapper.find('#btn-start').props().disabled).toBeFalsy();
    expect(wrapper.find('#btn-pause').props().disabled).toBeTruthy();
  });

  it('has start button disabled and pause button enabled after pressing reset', () => {
    wrapper.find('#btn-start').simulate('click');
    wrapper.find('#btn-reset').simulate('click');

    expect(wrapper.find('#btn-start').props().disabled).toBeFalsy();
    expect(wrapper.find('#btn-pause').props().disabled).toBeTruthy();
  });

  it('has start button and pause button disabled after onFinished', () => {
    const onFinished = wrapper.find(Sorter).props().onFinished!;
    onFinished();

    expect(wrapper.find('#btn-start').props().disabled).toBeTruthy();
    expect(wrapper.find('#btn-pause').props().disabled).toBeTruthy();
  });
});