import { Button, Center } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  paginationPages: number;
  activePage: number;
  handlePaginationPageChange: (paginationPages: number) => void;
}

export const Pagination = ({
  handlePaginationPageChange,
  paginationPages,
  activePage,
}: PaginationProps) => {
  const buttonList: JSX.Element[] = [];
  for (let i = 0; i < paginationPages; i++) {
    if (paginationPages !== 0) {
      buttonList.push(
        <Button
          colorScheme={i === activePage ? "blue" : "gray"}
          key={i}
          onClick={() => handlePaginationPageChange(i)}
        >
          {i + 1}
        </Button>
      );
    }
  }

  return <Center>{buttonList}</Center>;
};
