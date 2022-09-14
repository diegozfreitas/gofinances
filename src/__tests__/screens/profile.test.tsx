import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("profile", () => {
  it("should by show correctly user input name placeholder", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("should by user data has been loaded", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("inputName");
    const inputSurName = getByTestId("inputSurName");

    expect(inputName.props.value).toEqual("Diego");
    expect(inputSurName.props.value).toEqual("Freitas");
  });

  it("should by exist component title", () => {
    const { getByTestId } = render(<Profile />);

    const component = getByTestId("titleScreen");

    expect(component).toBeTruthy();
  });

  it("should by correctly title", () => {
    const { getByTestId } = render(<Profile />);

    const component = getByTestId("titleScreen");

    expect(component.props.children).toEqual("Profile");
  });

  it("should by exist component buttonSubmit", () => {
    const { getByTestId } = render(<Profile />);

    const buttonSubmit = getByTestId("buttonSubmit");

    expect(buttonSubmit).toBeTruthy();
  });
});
