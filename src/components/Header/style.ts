import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

type FeatherProps = typeof Feather;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: 16px;
  padding-top: ${RFPercentage(7)}px;
  min-height: ${RFPercentage(40)}px;
`;

export const Head = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const Image = styled.Image`
  border-radius: 10px;
  width: 48px;
  height: 48px;
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextGreeting = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.shape};
`;

export const TextName = styled.Text`
  font-weight: normal;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)<FeatherProps>`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(22)}px;
`;
