import React from "react";

import { Container, Title, Amount, Footer, Type, Date } from "./style";

import { categories } from "../../../utils/categories";

export interface TransactionProp {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  type: "positive" | "negative";
}

interface CardTransactionProps {
  data: TransactionProp;
}

export const CardTransaction = ({ data }: CardTransactionProps) => {
  const { name, amount, category, date, type } = data;

  const categoryObj = categories.find(
    (item) => item.key === category
  )

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Type color={categoryObj!.color}>{categoryObj!.name}</Type>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
