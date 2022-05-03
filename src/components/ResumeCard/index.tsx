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

interface ResumeCardProps {
  title: string;
  amount: string;
  description: string;
  type: 'up' | 'down' | 'resume'
}

const iconType = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  resume: 'dollar-sign'
}

export const ResumeCard = ({ amount, description, title, type }: ResumeCardProps) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={iconType[type]} type={type}/>
      </Header>

      <Body>
        <Amount type={type}>{amount}</Amount>
        <Description type={type}>{description}</Description>
      </Body>
    </Container>
  );
};
