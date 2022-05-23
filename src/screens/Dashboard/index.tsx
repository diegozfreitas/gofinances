import React, { useCallback, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { UseAuth } from "../../contexts/Auth";

import { Header } from "../../components/Header";
import { ListTransactions } from "../../components/ListTransactions";

import { TransactionProp } from "../../components/ListTransactions/CardTransaction";
import { ResumeCard } from "../../components/ResumeCard";

import { Container, ContentResumeCards } from "./style";
import { useTheme } from "styled-components";

interface highLightProps {
  amount: string;
  lastTransaction: string;
}

interface highLightData {
  entries: highLightProps;
  expensive: highLightProps;
  total: highLightProps;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([] as TransactionProp[]);
  const [highLightData, setHighLightData] = useState<highLightData>(
    {} as highLightData
  );

  const { user } = UseAuth();

  const theme = useTheme();

  const getLastTransactionDate = (
    collection: TransactionProp[],
    type: "positive" | "negative"
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((item) => item.type === type)
          .map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de  ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  async function loadTransactions() {
    setIsLoading(true);
    const dataKey = `@gofinance:transactions_user:${user.id}`;
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

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );

    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionExpensive}`;

    setHighLightData({
      entries: {
        amount: entriesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          entriesSum === 0
            ? "Ainda não tem entrada"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          expensiveSum === 0
            ? "Ainda não tem saída"
            : `Última saída dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: total === 0 ? "" : totalInterval,
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
      <Header />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.secondary} size={50} />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <ContentResumeCards>
            <ResumeCard
              title={"Entrada"}
              amount={highLightData?.entries?.amount}
              description={highLightData?.entries?.lastTransaction}
              type={"up"}
            />
            <ResumeCard
              title={"Saidas"}
              amount={highLightData?.expensive?.amount}
              description={highLightData?.expensive?.lastTransaction}
              type={"down"}
            />
            <ResumeCard
              title={"Resumo"}
              amount={highLightData?.total?.amount}
              description={highLightData?.total?.lastTransaction}
              type={"resume"}
            />
          </ContentResumeCards>

          <ListTransactions data={transactions} />
        </>
      )}
    </Container>
  );
};
