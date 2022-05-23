import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { UseAuth } from "../../contexts/Auth";

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
import { useEffect } from "react";
interface FormData {
  id: string;
  type: string;
  category: string;
  amount: number;
  name: string;
  date: string;
}

export const Register = () => {
  const [showModalSelectCategory, setShowModalSelectCategory] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");

  const { user } = UseAuth();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = async (form) => {
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

    const newTransaction: FormData = {
      id: String(uuid.v4()),
      type: transactionType,
      category: category,
      name: form.name,
      amount: form.amount,
      date: String(new Date()),
    };

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setCategory("");
      setTransactionType("");

      // @ts-ignore
      navigation.navigate("Listagem");
    } catch (error) {
      console.log("Erro no Registro", error);
      Alert.alert("Não foi possivel guardar!");
    }
  };

  useEffect(() => {}, []);

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
                  type="positive"
                  width={48}
                  isActive={transactionType === "positive"}
                  onPress={() => setTransactionType("positive")}
                />

                <OptionButton
                  title="Saida"
                  type="negative"
                  width={48}
                  isActive={transactionType === "negative"}
                  onPress={() => setTransactionType("negative")}
                />
              </ContainerOptions>

              <MarginTopEight />

              <Select
                value={
                  categories.find((item) => item.key === category)
                    ? categories.find((item) => item.key === category)!.name
                    : ""
                }
                onPress={() => setShowModalSelectCategory(true)}
              />
            </Fields>

            <Button
              title="Enviar"
              onPress={
                // @ts-ignore
                handleSubmit(handleRegister)
              }
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>

      <Modal visible={showModalSelectCategory}>
        <ListCategories
          data={categories}
          onChange={(obj: DataCategory) => {
            setCategory(obj.key);
            setShowModalSelectCategory(false);
          }}
        />
      </Modal>
    </>
  );
};
