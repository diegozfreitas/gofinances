import React, { useCallback, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { ListTransactions } from "../../components/ListTransactions";

import { TransactionProp } from "../../components/ListTransactions/CardTransaction";
import { ResumeCard } from "../../components/ResumeCard";

import { Container, ContentResumeCards } from "./style";
import { useTheme } from "styled-components";

interface highLightProps {
  amount: string;
}

interface highLightData {
  entries: highLightProps;
  expensive: highLightProps;
  total: highLightProps;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([] as TransactionProp[]);
  const [highLightData, setHighLightData] = useState<highLightData>(
    {} as highLightData
  );

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    //await AsyncStorage.removeItem(dataKey);
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensiveSum = 0;

    const transactionsFormatted: TransactionProp[] = transactions.map(
      (item: TransactionProp) => {
        if (item.type === "positive") {
          entriesSum += Number(item.amount);
        }

        if (item.type === "negative") {
          expensiveSum += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          category: item.category,
          type: item.type,
          amount: amount,
          date: date,
        };
      }
    );

    const total = entriesSum - expensiveSum;

    setTransactions(transactionsFormatted);
    setHighLightData({
      entries: {
        amount: entriesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensive: {
        amount: expensiveSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();

      setIsLoading(false);
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.secondary} size={50} />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <Header />

          <ContentResumeCards>
            <ResumeCard
              title={"Entrada"}
              amount={highLightData?.entries?.amount}
              description={"bla bla bla"}
              type={"up"}
            />
            <ResumeCard
              title={"Saidas"}
              amount={highLightData?.expensive?.amount}
              description={"bla bla bla"}
              type={"down"}
            />
            <ResumeCard
              title={"Resumo"}
              amount={highLightData?.total?.amount}
              description={"bla bla bla"}
              type={"resume"}
            />
          </ContentResumeCards>

          <ListTransactions data={transactions} />
        </>
      )}
    </Container>
  );
};
