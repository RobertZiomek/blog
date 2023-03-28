import { Button, Text } from "@chakra-ui/react";
import React from "react";

const EMPTY_BUTTON = "...";

export const usePaginationButtons = (
  paginationPages: number[] | null,
  handlePaginationPageChange: (paginationPages: number) => void
) => {
  const buttonList = paginationPages?.map((page) => {
    if (page !== 0) {
      return (
        <Button onClick={() => handlePaginationPageChange(page - 1)}>
          {page}
        </Button>
      );
    } else {
      return <Text>{EMPTY_BUTTON}</Text>;
    }
  });
  console.log(buttonList);
  return buttonList;
};
