import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { UseAuth } from "../../contexts/Auth";

import { SingInSocialButton } from "../../components/SingInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SingInTitle,
  Footer,
  FooterWrapper,
} from "./style";

export const SingIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { singInWithGoogle, singInWithApple } = UseAuth();

  const theme = useTheme();

  const handleSingInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await singInWithGoogle();
    } catch (Err) {
      console.log(Err);
      setIsLoading(false);
      Alert.alert("Não foi possivel conectar a conta Google");
    }
  };

  const handleSingInWithApple = async () => {
    try {
      setIsLoading(true);
      return await singInWithApple();
    } catch (Err) {
      console.log(Err);
      setIsLoading(false);
      Alert.alert("Não foi possivel conectar a conta Apple");
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SingInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SingInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SingInSocialButton
            onPress={handleSingInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />

          {Platform.OS === "ios" && (
            <SingInSocialButton
              onPress={handleSingInWithApple}
              svg={AppleSvg}
              title="Entrar com Apple"
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator color={theme.colors.shape} size={30} />
        )}
      </Footer>
    </Container>
  );
};
