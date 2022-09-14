import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";

import theme from "../../globals/styles/light";
import { NavigationContainer } from "@react-navigation/native";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>{children}</NavigationContainer>
  </ThemeProvider>
);

describe("Register Screen", () => {
  it("should be open category modal when user click on button", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-modal-category");

    expect(categoryModal.props.visible).toBeFalsy();

    fireEvent.press(buttonCategory);

    expect(categoryModal?.props?.visible).toBeTruthy();
  });

  it("should write in field name", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const expectedText = 'Pizza'

    const fieldName = getByTestId("input-name");

    fireEvent.changeText(fieldName, expectedText)

    expect(fieldName.props.value).toBe(expectedText)
  });

  it("should write in field value", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const expectedText = '300,00'

    const fieldValue = getByTestId("input-value");

    fireEvent.changeText(fieldValue, expectedText)

    expect(fieldValue.props.value).toBe(expectedText)
  });
});
