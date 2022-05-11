import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View``;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;
  padding: 16px;
  border-radius: 5px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color:  ${({ theme }) => theme.colors.text_dark};
  margin-bottom: 8px;
`;

export const LabelError = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
