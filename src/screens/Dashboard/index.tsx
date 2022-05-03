import React from 'react'
import { Text } from 'react-native'

import { Header } from '../../components/Header'

import { Container } from './style'

export function Dashboard() {
  return (
    <Container>
      <Header/>

      <Text>Dashboard</Text>
    </Container>
  )
}