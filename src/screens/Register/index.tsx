import React, { useState } from "react";

import { Header } from "../../components/Header";
import { InputText } from "../../components/Form/InputText";
import { OptionButton } from "../../components/Form/OptionButton";
import { Select } from "../../components/Form/Select";
import { Button } from "../../components/Button";
import { ListCategories } from "../../components/ListCategories";

import { categories } from "../../utils/categories";

import {
  Container,
  Form,
  Fields,
  ContainerOptions,
  MarginEight,
} from "./style";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  return (
    <Container>
      {/* <Header hiddenInfoUser height={14} title="Lançamento" />

      <Form>
        <Fields>
          <InputText placeholder="Nome" />

          <InputText placeholder="Valor" />

          <MarginEight />

          <ContainerOptions>
            <OptionButton
              title="Entrada"
              type="up"
              width={48}
              isActive={transactionType === "up"}
              onPress={() => setTransactionType("up")}
            />

            <OptionButton
              title="Saida"
              type="down"
              width={48}
              isActive={transactionType === "down"}
              onPress={() => setTransactionType("down")}
            />
          </ContainerOptions>

          <MarginEight />

          <Select />

        </Fields>

        <Button title="Enviar" onPress={() => {}} />
      </Form> */}
      <ListCategories data={categories} />
    </Container>
  );
};
