import React from "react";
import { TextInputProps } from "react-native";

import { Container, Input, LabelError } from "./style";

interface InputTextProps extends TextInputProps {
  error: string;
}

export const InputText = ({ error, ...rest }: InputTextProps) => {
  return (
    <Container>
      <Input {...rest} />

      {error && <LabelError>{error}</LabelError>}
    </Container>
  );
};
