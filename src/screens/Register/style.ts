import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const ContainerOptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
