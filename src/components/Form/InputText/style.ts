import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface InputProps {
  active?: boolean;
}

export const Container = styled.View``;

export const Input = styled.TextInput<InputProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;
  padding: 16px;
  border-radius: 5px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text_dark};
  margin-bottom: 8px;

  ${({ active, theme }) =>
    active &&
    css`
      border-width: 1px;
      border-color: ${theme.colors.attention};
    `}
`;

export const LabelError = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
