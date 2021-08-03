import { shallow, ShallowWrapper } from "enzyme";
import App from "./App";
import { SortingApp } from "./components/SortingApp/SortingApp";

describe('App', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('renders the SorterApp', () => {
    expect(wrapper.find(SortingApp)).toHaveLength(1);
  });
});