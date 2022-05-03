import React from "react";
import { Text, View } from "react-native";

import {
  Container,
  Head,
  Image,
  ContentInfo,
  TextGreeting,
  TextName,
  Icon,
} from "./style";

export function Header() {
  return (
    <Container>
      <Head>
        <ContentInfo>
          <Image
            source={{ uri: "https://avatars.githubusercontent.com/u/14065173" }}
          />

          <View style={{ marginLeft: 16 }}>
            <TextGreeting>Olá</TextGreeting>
            <TextName>Diego</TextName>
          </View>
        </ContentInfo>

        <Icon name="power" />
      </Head>
    </Container>
  );
}
