import React from "react";

import { Container, Button, IconPrev, IconNext, Month } from "./style";

export const FilterByMonth = () => {
  return (
    <Container>
      <Button>
        <IconPrev name="chevron-left" />
      </Button>

      <Month>Maio, 2022</Month>

      <Button>
        <IconNext name="chevron-right"/>
      </Button>
    </Container>
  );
};
