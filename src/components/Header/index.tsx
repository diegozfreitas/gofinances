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
  Title
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

          <Icon name="power" />
        </Head>
      )}

      <Title>{title}</Title>
    </Container>
  );
};
