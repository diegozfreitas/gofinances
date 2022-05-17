import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import {
  ListTransactions,
} from "../../components/ListTransactions";

import { TransactionProp } from "../../components/ListTransactions/CardTransaction";
import { ResumeCard } from "../../components/ResumeCard";

import { Container, ContentResumeCards } from "./style";

export const Dashboard = () => {
  const [data, setData] = useState([] as TransactionProp[]);

  async function loadTransactions() {
    const dataKey = "@gofinance:transactions";
    //await AsyncStorage.removeItem(dataKey);
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: TransactionProp[] = transactions.map(
      (item: TransactionProp) => {
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

    setData(transactionsFormatted);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header />

      <ContentResumeCards>
        <ResumeCard
          title={"Entrada"}
          amount={"R$ 500,00"}
          description={"bla bla bla"}
          type={"up"}
        />
        <ResumeCard
          title={"Saidas"}
          amount={"R$ 200,00"}
          description={"bla bla bla"}
          type={"down"}
        />
        <ResumeCard
          title={"Resumo"}
          amount={"R$ 500,00"}
          description={"bla bla bla"}
          type={"resume"}
        />
      </ContentResumeCards>

      <ListTransactions data={data} />
    </Container>
  );
};
