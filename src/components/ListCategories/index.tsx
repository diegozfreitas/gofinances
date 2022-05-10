import React from "react";

import { Container, List, Item, Label } from "./style";

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
            <Label>{item.name}</Label>
          </Item>
        )}
      />
    </Container>
  );
};
