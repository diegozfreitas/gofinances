import styled from "styled-components/native";
import {RFPercentage} from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentResumeCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 16 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(17)}px;
`;
