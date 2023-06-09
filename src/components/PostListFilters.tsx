import { Checkbox, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BlogPostCategory } from "../types/blogPost";

interface PostListFiltersProps {
  onFiltersChange: (filters: PostListFiltersValues, activePage: number) => void;
  filters: PostListFiltersValues;
}

export interface PostListFiltersValues {
  categories: BlogPostCategory[];
  search: string;
}

export const PostListFilters = ({
  onFiltersChange,
  filters,
}: PostListFiltersProps) => {
  const blogPostCategories = Object.values(BlogPostCategory);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggledCategory = e.target.value as BlogPostCategory;
    const updatedCategories = filters.categories.includes(toggledCategory)
      ? filters.categories.filter((category) => category !== toggledCategory)
      : [...filters.categories, toggledCategory];

    onFiltersChange({ ...filters, categories: updatedCategories }, 0);
  };

  const handleSearchWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange(
      {
        ...filters,
        search: e.target.value,
      },
      0
    );
  };
  return (
    <>
      <HStack spacing={[1, 5]}>
        <Text>Category: </Text>
        {blogPostCategories.map((category) => (
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
          onChange={handleSearchWordChange}
          value={filters.search}
        />
      </Stack>
    </>
  );
};
