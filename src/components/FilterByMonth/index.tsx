import React from "react";

import { Container, Button, IconPrev, IconNext, Month } from "./style";

interface FilterByMonth {
  onNext: () => void;
  onPrev: () => void;
  value: string;
}

export const FilterByMonth = (props: FilterByMonth) => {
  const { onNext, onPrev, value } = props;

  return (
    <Container>
      <Button onPress={() => onPrev()}>
        <IconPrev name="chevron-left" />
      </Button>

      <Month>{value}</Month>

      <Button onPress={() => onNext()}>
        <IconNext name="chevron-right" />
      </Button>
    </Container>
  );
};
