import { Checkbox, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BlogPostCategory } from "../types/blogPost";

interface PostListFiltersProps {
  onFiltersChange: (filters: PostListFiltersValues) => void;
  filters: PostListFiltersValues;
}

export interface PostListFiltersValues {
  categories: BlogPostCategory[];
  search: string;
}

export const SearchPost = ({
  onFiltersChange,
  filters,
}: PostListFiltersProps) => {
  const [searchWord, setSearchWord] = useState(filters.search);
  const blogPostCategory = Object.values(BlogPostCategory);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filters.categories.includes(e.target.value as BlogPostCategory)) {
      const updatedCategoryProps = filters.categories.filter(
        (item) => item !== e.target.value
      );
      onFiltersChange({ categories: updatedCategoryProps, search: searchWord });
    } else {
      onFiltersChange({
        categories: [
          ...filters.categories,
          e.target.value,
        ] as BlogPostCategory[],
        search: searchWord,
      });
    }
  };

  const handleSearchWordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    onFiltersChange({
      categories: filters.categories,
      search: e.target.value,
    });
  };

  return (
    <>
      <HStack spacing={[1, 5]}>
        <Text>Category: </Text>
        {blogPostCategory.map((category) => (
          <Checkbox
            key={category}
            value={category}
            isChecked={filters.categories.includes(category)}
            size="lg"
            colorScheme="green"
            onChange={handleCategoryChange}
          >
            {category}
          </Checkbox>
        ))}
      </HStack>
      <Stack spacing={3}>
        <Input
          placeholder="Search..."
          size="md"
          onChange={handleSearchWordOnChange}
          value={filters.search}
        />
      </Stack>
    </>
  );
};
