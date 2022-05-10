import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const List = styled.FlatList``;

export const Item = styled.TouchableOpacity`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-bottom-width: 1px;
  border-style: solid;
  border-color: red;
  margin-bottom: 4px;
`;

export const Label = styled.Text``;
