import { Checkbox, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BlogPostCategory } from "../types/blogPost";

interface SearchPostProps {
  handleSearchCategory: (category: BlogPostCategory[]) => void;
  handleSearchWord: (word: string) => void;
  handlePaginationPageChange: (paginationPage: number) => void;
}

function SearchPost({
  handleSearchCategory,
  handleSearchWord,
  handlePaginationPageChange,
}: SearchPostProps) {
  const [searchItems, setSearchItems] = useState<BlogPostCategory[]>([]);
  const blogPostCategory = Object.values(BlogPostCategory);

  const handleCheckbox = (e: any) => {
    if (searchItems.includes(e.target.value)) {
      const searchItemsFilter = searchItems.filter(
        (item) => item !== e.target.value
      );
      setSearchItems(searchItemsFilter);
    } else {
      setSearchItems([...searchItems, e.target.value]);
      handlePaginationPageChange(0);
    }
  };
  const handleSearchWordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchWord(e.target.value);
    handlePaginationPageChange(0);
  };
  handleSearchCategory(searchItems);
  return (
    <>
      <Stack spacing={[1, 5]} direction={["row"]}>
        <Text>Category: </Text>
        {blogPostCategory.map((category) => (
          <Checkbox
            value={category}
            checked
            size="lg"
            colorScheme="green"
            onChange={handleCheckbox}
          >
            {category}
          </Checkbox>
        ))}
      </Stack>
      <Stack spacing={3}>
        <Input
          placeholder="Search..."
          size="md"
          onChange={handleSearchWordOnChange}
        />
      </Stack>
    </>
  );
}

export default SearchPost;
