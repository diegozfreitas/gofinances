import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = {
  color: string;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  margin-bottom: 16px;
  padding: 8px 24px;

  border-left-width: 4px;
  border-style: solid;
  border-color: ${({ color }) => (color ? color : "#333")};
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Amount = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text_dark};
`;
