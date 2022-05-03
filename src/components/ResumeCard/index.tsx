import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Body,
  Amount,
  Description,
} from "./style";

export const ResumeCard = () => {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Body>
        <Amount>R$ 17.000,00</Amount>
        <Description>Ultima entrada dia 08 de abril</Description>
      </Body>
    </Container>
  );
};
