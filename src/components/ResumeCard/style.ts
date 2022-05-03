import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type FeatherProps = typeof Feather;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;

  border-radius: 5px;

  padding: 16px 24px ${RFValue(32)}px;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<FeatherProps>`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(40)}px;
`;

export const Body = styled.View`
  margin-top: 16px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
