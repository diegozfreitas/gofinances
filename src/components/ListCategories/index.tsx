import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { Container, Item, Label, Circle } from "./style";

import { Header } from "../Header";

export interface DataCategory {
  key: string;
  name: string;
  color: string;
}

interface ListCategoriesProps {
  data: DataCategory[];
  onChange: (data: DataCategory) => void;
}

export const ListCategories = ({ data, onChange }: ListCategoriesProps) => {
  return (
    <Container>
      <Header title="Selecione" hiddenInfoUser height={14} />

      <FlatList
        data={data}
        renderItem={({ item }: ListRenderItemInfo<DataCategory>) => (
          <Item onPress={() => onChange(item)}>
            <Circle color={item.color} />
            <Label>{item.name}</Label>
          </Item>
        )}
        keyExtractor={(item: DataCategory) => item.key}
      />
    </Container>
  );
};
