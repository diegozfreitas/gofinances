import React from "react";

import { Container, Button, IconPrev, IconNext, Month } from "./style";

interface FilterByMonth {
  onNext: () => void;
  onPrev: () => void;
  value: string;
  disabledNext?: boolean;
  disabledPrev?: boolean;
}

export const FilterByMonth = (props: FilterByMonth) => {
  const { onNext, onPrev, value, disabledPrev, disabledNext } = props;

  return (
    <Container>
      <Button onPress={() => onPrev()} disabled={disabledPrev}>
        <IconPrev name="chevron-left" disabled={disabledPrev} />
      </Button>

      <Month>{value}</Month>

      <Button onPress={() => onNext()} disabled={disabledNext}>
        <IconNext name="chevron-right" disabled={disabledNext} />
      </Button>
    </Container>
  );
};
