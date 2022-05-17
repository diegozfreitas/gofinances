import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { Container, Title, List } from "./style";

import { CardTransaction, TransactionProp } from "./CardTransaction";

export interface ListTransactionsProps {
  data: TransactionProp[];
}

export const ListTransactions = ({ data }: ListTransactionsProps) => {
  return (
    <Container>
      <Title>Listagem</Title>

      <FlatList
        data={data}
        renderItem={({ item }: ListRenderItemInfo<TransactionProp>) => (
          <CardTransaction data={item} />
        )}
        keyExtractor={(item: TransactionProp) => item.id}
      />
    </Container>
  );
};
