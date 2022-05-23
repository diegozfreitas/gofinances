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

import { UseAuth } from "../../contexts/Auth";

interface HeaderProps {
  hiddenInfoUser?: boolean;
  height?: number;
  title?: string;
}

export const Header = ({ hiddenInfoUser, height, title }: HeaderProps) => {
  const { singOut, user } = UseAuth();

  return (
    <Container height={height}>
      {!hiddenInfoUser && (
        <Head>
          <ContentInfo>
            <Image
              source={{
                uri: user.photo,
              }}
            />

            <View style={{ marginLeft: 16 }}>
              <TextGreeting>Olá</TextGreeting>
              <TextName>{user.name}</TextName>
            </View>
          </ContentInfo>

          <LogoutButton onPress={()=> singOut()}>
            <Icon name="power" />
          </LogoutButton>
        </Head>
      )}

      <Title>{title}</Title>
    </Container>
  );
};
