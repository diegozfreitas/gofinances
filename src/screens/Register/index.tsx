import React, { useState } from "react";

import { Header } from "../../components/Header";
import { InputText } from "../../components/Form/InputText";
import { OptionButton } from "../../components/Form/OptionButton";
import { Select } from "../../components/Form/Select";
import { Button } from "../../components/Button";

import { Container, Form, Fields, ContainerOptions } from "./style";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  return (
    <Container>
      <Header hiddenInfoUser height={14} title="Lançamento" />

      <Form>
        <Fields>
          <InputText placeholder="Nome" />

          <InputText placeholder="Valor" />

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

          <Select/>
        </Fields>

        <Button title="Enviar" onPress={() => {}} />
      </Form>
    </Container>
  );
};
