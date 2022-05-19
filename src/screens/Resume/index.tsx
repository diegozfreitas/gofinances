import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "./style";

import { Header } from "../../components/Header";
import { CategoryData, HistoryCard } from "../../components/HistoryCard";
import { TransactionProp } from "../../components/ListTransactions/CardTransaction";

import { categories } from "../../utils/categories";

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [] as CategoryData[]
  );

  const loadData = async () => {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const allExpensive = responseFormatted.filter(
      (expensive: TransactionProp) => expensive.type === "negative"
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      allExpensive.forEach((expensive: TransactionProp) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header hiddenInfoUser height={14} title="Resumo" />

      <HistoryCard data={totalByCategories}/>
    </Container>
  );
};
