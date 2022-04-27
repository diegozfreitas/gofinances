import React from 'react'
import { Text, View, Image } from 'react-native'

import { Container, Icon } from './style'

export function Header() {
  return (
    <Container>
      <View>
        <Image
          source={{
            uri: 'https://avatars.githubusercontent.com/u/14065173',
          }}
          width={30}
          height={30}
        />
        <View>
          <Text>Olá</Text>
          <Text>Diego</Text>
        </View>
      </View>

      <Icon name="power"/>
    </Container>
  )
}