import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons';


export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary} ;
  width: 100% ;
  padding-top: 25px ;
  min-height: ${RFPercentage(40)}px ;
`;

export const Icon = styled(Feather).attrs({
  size: 24,
  color: 'black',
})``;