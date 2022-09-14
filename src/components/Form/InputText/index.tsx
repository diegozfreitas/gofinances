import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container, Input, LabelError } from "./style";

interface InputTextProps extends TextInputProps {
  error: string;
  active?: boolean;
}

export const InputText = ({
  active = false,
  error,
  ...rest
}: InputTextProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Input
        active={active}
        {...rest}
        //placeholderTextColor={theme.colors.text}
      />

      {error && <LabelError>{error}</LabelError>}
    </Container>
  );
};
