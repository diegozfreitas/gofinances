import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type?: "positive" | "negative";
  width?: number;
  isActive?: boolean;
}

export const Container = styled.TouchableOpacity<TypeProps>`
  width: ${({ width }) => (width ? width : 100)}%;
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  margin-bottom: 8px;

  ${({ isActive, type }) =>
    isActive &&
    type === "positive" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_text};
    `};

  ${({ isActive, type }) =>
    isActive &&
    type === "negative" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_text};
    `};

  border-radius: 5px;
`;

export const Label = styled.Text<TypeProps>`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.text_dark : theme.colors.text};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.success};

  ${({ type }) =>
    type === "positive" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === "negative" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
`;
