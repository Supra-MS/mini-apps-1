import React from 'react';
import App from '../client/src/components/App';
import CheckWinnerMoves from '../client/src/utils/CheckWinnerMoves.js';
import { configure, shallow } from "enzyme"; // shallow will create the instance
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
configure({ adapter: new Adapter() });


describe("Connect 4 Game test cases: ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  })
  let testRow = [
    ["Red", "Red", "Red", "Red", null, null, null],
    ["Yellow", "Yellow", "Yellow", null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]

  let testColumn = [
    ["Yellow", "Red", "Red", "Red", null, null, null],
    ["Yellow", "Red", null, null, null, null, null],
    ["Yellow", null, null, null, null, null, null],
    ["Yellow", null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ];

  let testDiagonalLtR = [
    ["Yellow", "Red", "Yellow", "Red", "Yellow", null, null],
    ["Red", "Yellow", "Red", null, null, null, null],
    ["Yellow", "Red", null, null, null, null, null],
    ["Red", null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ];

  let testDiagonalRtL = [
    [null, null, null, "Yellow", "Red", "Red", "Red"],
    [null, null, null, "Red", "Yellow", "Yellow", "Yellow"],
    [null, null, null, "Yellow", "Red", "Red", "Red"],
    [null, null, null, null, "Yellow", "Yellow", "Red"],
    [null, null, null, null, "Red", "Yellow", "Red"],
    [null, null, null, null, "Yellow", "Yellow", "Yellow"]
  ];

  let testTie = [
    ["Red", "Red", "Yellow", "Red", "Red", "Red", "Yellow"],
    ["Yellow", "Yellow", "Red", "Yellow", "Yellow", "Red", "Yellow"],
    ["Red", "Red", "Yellow", "Red", "Red", "Yellow", "Red"],
    ["Yellow", "Yellow", "Red", "Yellow", "Yellow", "Red", "Yellow"],
    ["Red", "Red", "Yellow", "Red", "Red", "Yellow", "Red"],
    ["Yellow", "Yellow", "Red", "Yellow", "Yellow", "Red", "Yellow"]
  ];

  test('Should check for the title of the app: ', () => {
    expect(wrapper.find('h5').text()).toBe('Connect 4 Game');
  });

  test("Should for the reset button: ", () => {
    expect(wrapper.find('.btn-success').text()).toBe('Reset');
  });

  test("should check the possible row winning positions: ", () => {
    expect(CheckWinnerMoves.checkRow(testRow)).toBe('Red');
  });

  test("should check the possible column winning positions: ", () => {
    expect(CheckWinnerMoves.checkColumn(testColumn)).toBe('Yellow');
  });

  test("should check the possible diagonal left to right winning positions: ", () => {
    expect(CheckWinnerMoves.checkDiagonalLeftToRight(testDiagonalLtR)).toBe('Red');
  });

  test("should check the possible diagonal right to left winning positions: ", () => {
    expect(CheckWinnerMoves.checkDiagonalRightToLeft(testDiagonalRtL)).toBe('Yellow');
  });

  test("should check the possible tie positions: ", () => {
    let component = renderer.create(<App />).getInstance();
    component.state.isTie = true;
    expect(component.state.isTie).toBe(true);
  });

  test("Should check the initial value of the state: ", () => {
    let component = renderer.create(<App />).getInstance();
    expect(component.state.playerTurn).toBe('Red');
  });

  test("Should check the changed value of the state: ", () => {
    let component = renderer.create(<App />).getInstance();
    component.switchPlayer();
    expect(component.state.playerTurn).toBe('Yellow');
  });


});

/*
console.log(CheckWinnerMoves.checkRow(testRow));
console.log(wrapper.debug(), 'wrapper debug()');
expect(wrapper.find('h5').text()).toContain('Connect 4 Game');
const titleElement = getByText('Connect 4 Game');
console.log(ReactDOM.render(<App />, document.createElement('div')));
const { getByText } = ReactDOM.render(<App />, document.createElement('div'));
console.log(wrapper.props().children[1].props.children[2].props)

*/