import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Label, Icon } from "./style";

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

interface OptionButtonProps extends TouchableOpacityProps {
  type: "positive" | "negative";
  title: string;
  width?: number;
  isActive: boolean;
}

export const OptionButton = (props: OptionButtonProps) => {
  const { title, type, width, isActive, ...rest } = props;

  return (
    <Container {...rest} width={width} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />

      <Label isActive={isActive}>{title}</Label>
    </Container>
  );
};
