import { mount, ReactWrapper } from "enzyme"
import React from "react";
import { LabeledSelect } from "../LabeledSelect/LabeledSelect";
import { dataPresets, DataPresetSelection } from "./DataPresetSelection";

function isSorted(array: any[], compare: (i: any, j: any) => boolean) {
  for(let i = 0; i<array.length - 1; i++) {
    if(!compare(array[i], array[i+1])) return false;
  }

  return true;
}

describe('DataPresetSelection', () => {
  let wrapper: ReactWrapper;
  const presetCallback = jest.fn();
  const dataCallback = jest.fn();
  const count = 150;
  const uniques = 16;
  let onChange: React.ChangeEventHandler<HTMLSelectElement>;

  beforeEach(() => {
    wrapper = mount(<DataPresetSelection count={count} onPresetChange={presetCallback} onDataChange={dataCallback} />);
    onChange = wrapper.find(LabeledSelect).props().onChange!;
  });

  it('renders the LabeledSelect element', () => {
    expect(wrapper.find(LabeledSelect)).toHaveLength(1);
  });

  it('renders all options', () => {
    const options = wrapper.find('option').map(option => option.props().value);
    dataPresets.forEach(preset => expect(options.includes(preset)).toBeTruthy());
  });

  it('passes the preset prop to the LabeledSelect', () => {
    dataPresets.forEach(preset => {
      wrapper.setProps({preset: preset});
      expect(wrapper.find(LabeledSelect).props().value).toBe(preset);
    });
  });

  it('should not fail without a callback', () => {
    wrapper.setProps({onPresetChange: undefined, onDataChange: undefined});
    onChange = wrapper.find(LabeledSelect).props().onChange!;
    expect(() => onChange({target: {value: 'shuffled'}} as React.ChangeEvent<HTMLSelectElement>)).not.toThrow();
  });

  describe('presets', () => {
    describe('shuffled', () => {
      beforeEach(() => {
        wrapper.setProps({preset: 'shuffled'});
      });

      it('calls onPresetChange callback with correct preset name', () => {
        onChange({target: {value: 'shuffled'}} as React.ChangeEvent<HTMLSelectElement>);
        
        const preset = presetCallback.mock.calls[0][0];

        expect(preset).toBe('shuffled');
      });

      it('calls onDataChange callback with correct data', () => {
        expect(dataCallback).toHaveBeenCalled();

        const data = dataCallback.mock.calls[0][0];

        expect(Array.isArray(data)).toBeTruthy();
      
        const array = data as any[]
        expect(isSorted(array, (i: any, j: any) => i <= j)).toBeFalsy();
        expect(isSorted(array, (i: any, j: any) => i >= j)).toBeFalsy();
      })
    });

    describe('sorted', () => {
      beforeEach(() => {
        wrapper.setProps({preset: 'sorted'});
      });

      it('calls onChange callback with correct arguments', () => {
        onChange({target: {value: 'sorted'}} as React.ChangeEvent<HTMLSelectElement>);

        const preset = presetCallback.mock.calls[0][0];

        expect(preset).toBe('sorted');

      });

      it('calls onDataChange callback with correct data', () => {
        expect(dataCallback).toHaveBeenCalled();

        const data = dataCallback.mock.calls[1][0];

        expect(Array.isArray(data)).toBeTruthy();

        expect(isSorted(data as any[], (i: any, j: any) => i <= j)).toBeTruthy();
      });
    });

    describe('reverseSorted', () => {
      beforeEach(() => {
        wrapper.setProps({preset: 'reverseSorted'});
      });

      it('calls onChange callback with correct arguments', () => {
        onChange({target: {value: 'reverseSorted'}} as React.ChangeEvent<HTMLSelectElement>);

        const preset = presetCallback.mock.calls[0][0];
        
        expect(preset).toBe('reverseSorted');

      });

      it('calls onDataChange callback with correct data', () => {
        expect(dataCallback).toHaveBeenCalled();

        const data = dataCallback.mock.calls[1][0];

        expect(Array.isArray(data)).toBeTruthy();

        expect(isSorted(data as any[], (i: any, j: any) => i >= j)).toBeTruthy();
      });
    });

    describe('fewUnique', () => {
      beforeEach(() => {
        wrapper.setProps({preset: 'fewUnique'});
      });

      it('calls onChange callback with correct arguments', () => {
        onChange({target: {value: 'fewUnique'}} as React.ChangeEvent<HTMLSelectElement>);

        const preset = presetCallback.mock.calls[0][0];
        
        expect(preset).toBe('fewUnique');

      });

      it('calls onDataChange callback with correct data', () => {
        expect(dataCallback).toHaveBeenCalled();

        const data = dataCallback.mock.calls[1][0];

        expect(Array.isArray(data)).toBeTruthy();

        const array = data as any[]
        expect(isSorted(array, (i: any, j: any) => i <= j)).toBeFalsy();
        expect(isSorted(array, (i: any, j: any) => i >= j)).toBeFalsy();

        const frequency = array.reduce((accumulator, value) => {
          accumulator[value] = (accumulator[value] || 0) + 1;

          return accumulator
        }, {});

        expect(Object.keys(frequency).length).toBe(uniques);
        Object.entries(frequency).forEach(([value, count]) => {
          const lower = Math.floor(array.length/uniques);
          expect(count === lower || count === lower + 1).toBeTruthy();
        });
      });
    });
  });
});
