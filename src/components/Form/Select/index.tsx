import React from "react";
import { Modal, Text, View } from "react-native";

import { Container, Header, Title, Icon } from "./style";

interface SelectProps {
  value: string;
  onPress: () => void;
}

export const Select = ({ value, onPress }: SelectProps) => {
  return (
    <Container>
      <Header onPress={() => onPress()}>
        <Title>{value ? value : "Estou dentro do modal"}</Title>

        <Icon name="chevron-down" />
      </Header>
    </Container>
  );
};
