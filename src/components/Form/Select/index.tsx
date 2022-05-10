import React from "react";
import { Modal, Text, View } from "react-native";

import { Container, Header, Title, Icon } from "./style";

export const Select = () => {
  return (
    <Container>
      <Header animationType="slide" visible={true}>
        <Title>Estou dentro do modal</Title>

        <Icon name="chevron-down" />
      </Header>
    </Container>
  );
};
