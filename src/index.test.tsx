import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index.tsx");

    const render = ReactDOM.render as jest.Mock;

    const [arg1, arg2] = render.mock.calls[0];

    expect(arg1.props.children.type).toBe((<App />).type);
    expect(arg2).toBe(div);
  });
});