import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

type typesProps = {
  type: "up" | "down" | "resume";
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

  ${({ type }) => type === "up" && css`
    color: ${({theme}) =>  theme.colors.success}; 
  `};

  ${({ type }) => type === "down" && css`
    color: ${({theme}) =>  theme.colors.attention}; 
  `};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Type = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;
