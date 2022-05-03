import React from "react";

import { Container, Title, List } from "./style";

import { CardTransaction, TransactionProp } from "./CardTransaction";

export interface ListTransactionsProps extends TransactionProp {
  id: string;
}

const data: ListTransactionsProps[] = [
  {
    id: "1",
    title: "Ultrices Posuere Corporation",
    amount: "R$ 47,31",
    category: "Eletronicos",
    date: "13/04/2022",
    type: "down",
  },
  {
    id: "2",
    title: "Sed Id R'i'sus Industries",
    amount: "R$ 18,77",
    category: "Eletronicos",
    date: "11/07/2022",
    type: "up",
  },
  {
    id: "3",
    title: "Quis Massa Industries",
    amount: "R$ 2,47",
    category: "Eletronicos",
    date: "08/08/2021",
    type: "up",
  },
  {
    id: "4",
    title: "Vel Pede Blandit Inc.",
    amount: "R$ 38,54",
    category: "Peças",
    date: "09/07/2022",
    type: "down",
  },
  {
    id: "5",
    title: "Id Enim Curabitur LLP",
    amount: "R$ 12,36",
    category: "Eletronicos",
    date: "17/08/2022",
    type: "down",
  },
  {
    id: "6",
    title: "Ultrices Posuere Corporation",
    amount: "R$ 47,31",
    category: "Eletronicos",
    date: "13/04/2022",
    type: "down",
  },
  {
    id: "7",
    title: "Sed Id R'i'sus Industries",
    amount: "R$ 18,77",
    category: "Eletronicos",
    date: "11/07/2022",
    type: "up",
  },
  {
    id: "8",
    title: "Quis Massa Industries",
    amount: "R$ 2,47",
    category: "Eletronicos",
    date: "08/08/2021",
    type: "up",
  },
  {
    id: "9",
    title: "Vel Pede Blandit Inc.",
    amount: "R$ 38,54",
    category: "Peças",
    date: "09/07/2022",
    type: "down",
  },
  {
    id: "10",
    title: "Id Enim Curabitur LLP",
    amount: "R$ 12,36",
    category: "Eletronicos",
    date: "17/08/2022",
    type: "down",
  },
];

export const ListTransactions = () => {
  return (
    <Container>
      <Title>Listagem</Title>

      <List
        data={data}
        keyExtractor={(item: ListTransactionsProps) => item.id}
        renderItem={({ item }: { item: ListTransactionsProps }) => (
          <CardTransaction data={item} />
        )}
      />
    </Container>
  );
};
