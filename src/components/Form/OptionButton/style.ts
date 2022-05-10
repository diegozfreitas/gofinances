import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type: "up" | "down";
  width?: number;
  isActive: boolean;
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
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_text};
    `};

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_text};
    `};

  ${({ isActive }) =>
    !isActive &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.text};
    `}

  border-radius: 5px;
`;

export const Label = styled.Text`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.success};

  ${({ type }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
`;
