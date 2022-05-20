import React, { useCallback, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { Container, ContainerChart } from "./style";

import { Header } from "../../components/Header";
import { CategoryData, HistoryCard } from "../../components/HistoryCard";
import { FilterByMonth } from "../../components/FilterByMonth";
import { TransactionProp } from "../../components/ListTransactions/CardTransaction";

import { categories } from "../../utils/categories";

interface HistoryCardResume extends CategoryData {
  totalUnFormatted?: number;
  percent?: string;
}

export const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDateDB, setFirstDateDB] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [] as CategoryData[]
  );
  const theme = useTheme();

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const allExpensive = responseFormatted.filter(
      (expensive: TransactionProp) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    if (allExpensive.length > 0) {
      setFirstDateDB(new Date(allExpensive[0].date));
    }

    const sumAllExpensive = allExpensive.reduce(
      (accumulator: number, expensive: TransactionProp) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

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
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header hiddenInfoUser height={14} title="Resumo" />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.secondary} size={50} />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <FilterByMonth
            onNext={() => handleDateChange("next")}
            onPrev={() => handleDateChange("prev")}
            value={format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            disabledPrev={
              new Date(firstDateDB).getMonth() === selectedDate.getMonth() &&
              new Date(firstDateDB).getFullYear() === selectedDate.getFullYear()
            }
            disabledNext={
              new Date().getMonth() === selectedDate.getMonth() &&
              new Date().getFullYear() === selectedDate.getFullYear()
            }
          />

          {totalByCategories.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Sem dados</Text>
            </View>
          )}

          <ContainerChart>
            <VictoryPie
              data={totalByCategories}
              x="percent"
              y="totalUnFormatted"
              colorScale={totalByCategories.map((cat) => cat.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={75}
              height={350}
            />
          </ContainerChart>

          <HistoryCard
            paddingBottom={useBottomTabBarHeight()}
            data={totalByCategories}
          />
        </>
      )}
    </Container>
  );
};
