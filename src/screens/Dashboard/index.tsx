import React from "react";
import { Text } from "react-native";

import { Header } from "../../components/Header";
import { ListTransactions } from "../../components/ListTransactions";
import { ResumeCard } from "../../components/ResumeCard";

import { Container, ContentResumeCards } from "./style";

export const Dashboard = () => {
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

      <ListTransactions />
    </Container>
  );
};
