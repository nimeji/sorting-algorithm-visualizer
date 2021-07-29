import { shallow, ShallowWrapper } from "enzyme";
import { Canvas } from "../Canvas/Canvas";
import { Sorter } from "./Sorter";


describe('Sorter', () => {
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
  let wrapper: ShallowWrapper<typeof Sorter>;
  beforeAll(() => {
    wrapper = shallow(<Sorter data={data} />);
  });

  it('renders the canvas', () => {
    expect(wrapper.find(Canvas)).toHaveLength(1);
  })

  it('passes a draw function to the canvas', ()=>{
    expect(typeof wrapper.find(Canvas).props().draw).toBe('function');
  });
});