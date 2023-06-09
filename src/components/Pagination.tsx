import { Button, Center } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  totalPages: number;
  activePage: number;
  handlePageChange: (page: number) => void;
}

export const Pagination = ({
  handlePageChange,
  totalPages,
  activePage,
}: PaginationProps) => {
  return (
    <Center>
      {new Array(totalPages).fill(null).map((_, index) => (
        <Button
          colorScheme={index === activePage ? "blue" : "gray"}
          key={index}
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </Button>
      ))}
    </Center>
  );
};
