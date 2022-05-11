import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Header } from "../../components/Header";
import { InputTextRHF } from "../../components/formRHF/InputTextRHF";
import { OptionButton } from "../../components/Form/OptionButton";
import { Select } from "../../components/Form/Select";
import { Button } from "../../components/Button";
import { DataCategory, ListCategories } from "../../components/ListCategories";

import {
  Container,
  Form,
  Fields,
  ContainerOptions,
  MarginTopEight,
} from "./style";

import { schema } from "./validations";

import { categories } from "../../utils/categories";
interface FormData {
  transactionType: string;
  category: string;
  amount: number;
  name: string;
}

export const Register = () => {
  const [showModalSelectCategory, setShowModalSelectCategory] = useState(false);

  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnRegister: SubmitHandler<FormData> = (form) => {
    if (transactionType === "")
      return Alert.alert(
        "Selecione o tipo",
        "Você deve selecionar se é uma entrada ou saida!"
      );
    if (category === "")
      return Alert.alert(
        "Selecione a categoria",
        "Você deve selecionar uma categoria!"
      );

    const data: FormData = {
      transactionType: transactionType,
      category: category,
      name: form.name,
      amount: form.amount,
    };

    console.log(data);

    reset();
    setCategory("");
    setTransactionType("");
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header hiddenInfoUser height={14} title="Lançamento" />

          <Form>
            <Fields>
              <InputTextRHF
                placeholder="Nome"
                control={control}
                name="name"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />

              <InputTextRHF
                placeholder="Valor"
                control={control}
                name="amount"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />

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

            <Button title="Enviar" onPress={handleSubmit(handleOnRegister)} />
          </Form>
        </Container>
      </TouchableWithoutFeedback>

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
