import React from "react";
import { Modal, Text, ViewProps } from "react-native";

import { Container, Header, Title, Icon } from "./style";

interface SelectProps extends ViewProps {
  value: string;
  onPress: () => void;
}

export const Select = ({ value, onPress, ...rest }: SelectProps) => {
  return (
    <Container {...rest}>
      <Header onPress={() => onPress()}>
        <Title selected={value ? true : false}>
          {value ? value : "Selecione"}
        </Title>

        <Icon name="chevron-down" />
      </Header>
    </Container>
  );
};
