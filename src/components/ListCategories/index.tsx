import React from "react";

import { Container, List, Item, Label, Circle } from "./style";

import { Header } from "../Header";

export interface DataCategory {
  key: string;
  name: string;
  color: string;
}

interface ListCategoriesProps {
  data: DataCategory[];
}

export const ListCategories = ({ data }: ListCategoriesProps) => {
  return (
    <Container>
      <Header title="Selecione" hiddenInfoUser height={14} />

      <List
        data={data}
        keyExtractor={(item: DataCategory) => item.key}
        renderItem={({ item }: { item: DataCategory }) => (
          <Item>
            <Circle color={item.color} />
            <Label>{item.name}</Label>
          </Item>
        )}
      />
    </Container>
  );
};
