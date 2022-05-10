import React from "react";
import { TextInputProps } from "react-native";

import { Container, Input } from "./style";

interface InputTextProps extends TextInputProps {}

export const InputText = ({...rest}: InputTextProps) => {
  return (
    <Container >
      <Input {...rest} />
    </Container>
  );
};
