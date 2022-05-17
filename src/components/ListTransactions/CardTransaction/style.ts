import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

type typesProps = {
  type: "positive" | "negative";
};

type typeColor = {
  color: string;
};
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;
  margin-bottom: 16px;
  padding: 16px 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<typesProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-bottom: 16px;

  ${({ type }) =>
    type === "positive" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};

  ${({ type }) =>
    type === "negative" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Type = styled.Text<typeColor>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};

  border-left-width: 4px;
  border-style: solid;
  border-color: ${({ color }) => (color ? color : "#333")};
  padding-left: 12px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;
