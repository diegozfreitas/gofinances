import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface CircleProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const List = styled.FlatList``;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.tertiary_text};
  margin-bottom: 4px;

  flex-direction: row;
  align-items: center;
`;

export const Circle = styled.View<CircleProps>`
  width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;
  background-color: ${({ color }) => color};
  border-radius: 18px;
  margin-right: 8px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
`;
