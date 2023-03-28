import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";

const EMPTY_BUTTON = "...";
interface PaginationProps {
  paginationPosts: number[] | null;
  handlePaginationPageChange: (paginationPages: number) => void;
}
export const Pagination = ({
  handlePaginationPageChange,
  paginationPosts,
}: PaginationProps) => {
  const buttonList = paginationPosts?.map((page) => {
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
  return <Center>{buttonList}</Center>;
};
