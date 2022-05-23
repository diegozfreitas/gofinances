import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

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
  const { user } = UseAuth();

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
          <SingInSocialButton svg={GoogleSvg} title="Entrar com Google" />

          <SingInSocialButton svg={AppleSvg} title="Entrar com Apple" />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
