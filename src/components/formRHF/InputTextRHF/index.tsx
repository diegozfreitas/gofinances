import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Container, Input } from "./style";

interface InputTextRHFProps extends TextInputProps {
  control: Control;
  name: string;
}

export const InputTextRHF = ({ control, name, ...rest }: InputTextRHFProps) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onChangeText={onChange} onBlur={onBlur} value={value} {...rest} />
        )}
      />
    </Container>
  );
};
