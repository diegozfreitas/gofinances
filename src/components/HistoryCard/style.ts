import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type ContainerProps = {
  paddingBottom: number;
};

export const Container = styled.View<ContainerProps>`
  padding-left: 16px;
  padding-right: 16px;

  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : 0}px;

  max-height: ${RFPercentage(42)}px;
`;
