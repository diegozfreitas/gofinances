import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TitleProps {
  selected: boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
`;

export const Header = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 16px;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.text_dark : theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
