import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type FeatherProps = typeof Feather;

interface typeProps {
  type: "up" | "down" | "resume";
}

interface IconProps extends FeatherProps {
  type: "up" | "down" | "resume";
}

export const Container = styled.View<typeProps>`
  background-color: ${({ theme, type }) =>
    type === 'resume' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;

  border-radius: 5px;

  padding: 16px 24px ${RFValue(32)}px;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'resume' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};

  ${({ type }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};

  ${({ type }) =>
    type === "resume" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `};
`;

export const Body = styled.View`
  margin-top: 16px;
`;

export const Amount = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'resume' ? theme.colors.shape : theme.colors.title};
`;

export const Description = styled.Text<typeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'resume' ? theme.colors.shape : theme.colors.text};
`;
