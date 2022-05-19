import React from "react";
import { FlatList } from "react-native";

import { Container } from "./style";

import { CardItem } from "./CardTransaction";

export interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

interface HistoryCardProps {
  data: CategoryData[];
}

export const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }: { item: CategoryData }) => (
          <CardItem amount={item.total} title={item.name} color={item.color} />
        )}
        keyExtractor={(item) => item.key}
      />
    </Container>
  );
};
