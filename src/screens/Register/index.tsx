import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

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
  transactionType: string;
  category: string;
  amount: number;
  name: string;
  date: string;
}

export const Register = () => {
  const [showModalSelectCategory, setShowModalSelectCategory] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");

  const dataKey = "@gofinance:transactions";

  const navigation = useNavigation()

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
      transactionType: transactionType,
      category: category,
      name: form.name,
      amount: form.amount,
      date: String(new Date()),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setCategory("");
      setTransactionType("");

      navigation.navigate("Listagem")
    } catch (error) {
      console.log("Erro no Registro", error);
      Alert.alert("Não foi possivel guardar!");
    }
  };

  useEffect(() => {
    async function loadDate() {
      const result = await AsyncStorage.getItem(dataKey);

      console.log(JSON.parse(result!));
    }
    loadDate();
  }, []);

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

            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
