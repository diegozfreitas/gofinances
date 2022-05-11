import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import { Header } from "../../components/Header";
import { InputTextRHF } from "../../components/formRHF/InputTextRHF";
import { OptionButton } from "../../components/Form/OptionButton";
import { Select } from "../../components/Form/Select";
import { Button } from "../../components/Button";
import { DataCategory, ListCategories } from "../../components/ListCategories";

import { categories } from "../../utils/categories";

interface FormData {
  transactionType: string;
  category: string;
  amount: number;
  name: string;
}

import {
  Container,
  Form,
  Fields,
  ContainerOptions,
  MarginTopEight,
} from "./style";

export const Register = () => {
  const [showModalSelectCategory, setShowModalSelectCategory] = useState(false);

  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");

  const { control, handleSubmit } = useForm();

  const handleOnRegister = (form: FormData) => {
    const data: FormData = {
      transactionType: transactionType,
      category: category,
      name: form.name,
      amount: form.amount,
    };

    console.log(data);
  };

  return (
    <>
      <Container>
        <Header hiddenInfoUser height={14} title="Lançamento" />

        <Form>
          <Fields>
            <InputTextRHF placeholder="Nome" control={control} name="name" />

            <InputTextRHF placeholder="Valor" control={control} name="amount" />

            <MarginTopEight />

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

            <MarginTopEight />

            <Select
              value={category}
              onPress={() => setShowModalSelectCategory(true)}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleOnRegister)}
          />
        </Form>
      </Container>

      <Modal visible={showModalSelectCategory}>
        <ListCategories
          data={categories}
          onChange={(obj: DataCategory) => {
            setCategory(obj.name);
            setShowModalSelectCategory(false);
          }}
        />
      </Modal>
    </>
  );
};
