import React from "react";

import { Container, Title, Amount } from "./style";

export interface CardItemProps {
  color: string;
  title: string;
  amount: string;
}

export const CardItem = (props: CardItemProps) => {
  const { color, title, amount } = props;

  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
