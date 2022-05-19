import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";

import { useTheme } from "styled-components";

import { Container } from "./style";

import { Header } from "../../components/Header";
import { CategoryData, HistoryCard } from "../../components/HistoryCard";
import { TransactionProp } from "../../components/ListTransactions/CardTransaction";

import { categories } from "../../utils/categories";

interface HistoryCardResume extends CategoryData {
  totalUnFormatted?: number;
  percent?: string;
}

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [] as CategoryData[]
  );
  const theme = useTheme()

  const loadData = async () => {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const allExpensive = responseFormatted.filter(
      (expensive: TransactionProp) => expensive.type === "negative"
    );

    const sumAllExpensive = allExpensive.reduce(
      (accumulator: number, expensive: TransactionProp) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    console.log(sumAllExpensive);

    const totalByCategory: HistoryCardResume[] = [];

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

        const percent = `${((categorySum / sumAllExpensive) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalUnFormatted: categorySum,
          total,
          percent,
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

      <VictoryPie
        data={totalByCategories}
        x="percent"
        y="totalUnFormatted"
        colorScale={totalByCategories.map((cat) => cat.color)}
        style={{ labels: { fontSize: RFValue(18), fontWeight: "bold", fill: theme.colors.shape  } }}
        labelRadius={75}
      />

      <HistoryCard data={totalByCategories} />
    </Container>
  );
};
