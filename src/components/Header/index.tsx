import React from "react";
import { View } from "react-native";

import {
  Container,
  Head,
  Image,
  ContentInfo,
  TextGreeting,
  TextName,
  Icon,
  Title,
  LogoutButton,
} from "./style";

interface HeaderProps {
  hiddenInfoUser?: boolean;
  height?: number;
  title?: string;
}

export const Header = ({ hiddenInfoUser, height, title }: HeaderProps) => {
  return (
    <Container height={height}>
      {!hiddenInfoUser && (
        <Head>
          <ContentInfo>
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/14065173",
              }}
            />

            <View style={{ marginLeft: 16 }}>
              <TextGreeting>Olá</TextGreeting>
              <TextName>Diego</TextName>
            </View>
          </ContentInfo>

          <LogoutButton
            onPress={() => {
              console.log("botao de logout pressionado");
            }}
          >
            <Icon name="power" />
          </LogoutButton>
        </Head>
      )}

      <Title>{title}</Title>
    </Container>
  );
};
