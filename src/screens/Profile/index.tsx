import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export const Profile = () => {
  return (
    <View>
      <Text testID="titleScreen">Profile</Text>

      <TextInput testID="inputName" placeholder="Nome" autoCorrect={false} value="Diego"/>

      <TextInput testID="inputSurName" placeholder="Sobre Nome" value="Freitas"/>

      <Button testID="buttonSubmit" title="Salvar" onPress={() => {}} />
    </View>
  );
};
