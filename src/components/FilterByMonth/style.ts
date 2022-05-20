import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type IconProps = {
  disabled?: boolean;
};

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
`;

export const Button = styled.TouchableOpacity`
  padding-left: 8px;
  padding-right: 8px;
`;

export const IconPrev = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.text : theme.colors.text_dark};
`;

export const IconNext = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.text : theme.colors.text_dark};
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_dark};

  text-transform: capitalize;
`;
