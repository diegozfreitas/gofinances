import React from "react";
import { render } from "@testing-library/react-native";
import 'jest-styled-components'
import { RFValue } from "react-native-responsive-fontsize";


import { InputText } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../globals/styles/light";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);


describe("InputText Component", () => {
  it("Must have specific properties", () => {
    const { getByTestId, debug } = render(
      <InputText
        testID="inputEmail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        error=""
        active={true}
      />,
      {
        wrapper: Providers,
      }
    );

    const component = getByTestId("inputEmail");

    expect(component.props.style[0].backgroundColor).toEqual(theme.colors.shape);
    expect(component.props.style[0].borderColor).toEqual(theme.colors.attention);
    expect(component.props.style[0].borderRadius).toEqual(5);
    expect(component.props.style[0].borderWidth).toEqual(1);
    expect(component.props.style[0].color).toEqual(theme.colors.text_dark);
    expect(component.props.style[0].fontFamily).toEqual(theme.fonts.regular);
    expect(component.props.style[0].fontSize).toEqual(RFValue(15));
    expect(component.props.style[0].marginBottom).toEqual(8);
    expect(component.props.style[0].paddingBottom).toEqual(16);
    expect(component.props.style[0].paddingLeft).toEqual(16);
    expect(component.props.style[0].paddingRight).toEqual(16);
    expect(component.props.style[0].width).toEqual('100%');
  });
});
