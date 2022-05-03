import React from "react";

import { Container, Title, Amount, Footer, Type, Date } from "./style";

export interface TransactionProp{
    title: string;
    amount: string;
    category: string;
    date: string;
    type: "up" | "down" | "resume";
  };

interface CardTransactionProps {
  data: TransactionProp
}

export const CardTransaction = ({ data }: CardTransactionProps) => {
  const { title, amount, category, date, type } = data;

  return (
    <Container type={type}>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "down" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Type>{category}</Type>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
