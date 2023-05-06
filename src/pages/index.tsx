import { Button, HStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { PostList } from "../components/PostList";
import { api } from "../utils/api";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";
import { PostListFiltersValues, SearchPost } from "../components/SearchPost";
import { z } from "zod";
import { BlogPostCategory } from "../types/blogPost";
import qs from "qs";

const POST_LIST_FILTERS_DEBOUNCE = 500;
const POSTS_PER_PAGE = 8;

const queryParamsSchema = z.object({
  search: z.string().optional().default(""),
  categories: z.array(z.nativeEnum(BlogPostCategory)).optional().default([]),
});

interface QueryParams {
  search?: string;
  categories?: string;
}

const HomePage: NextPage = () => {
  const [activePage, setActivePage] = useState(0);
  const queryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as QueryParams;
  const [postListFilters, setPostListFilters] = useState<PostListFiltersValues>(
    () =>
      queryParamsSchema.parse({
        categories: queryParams.categories?.split(","),
        search: queryParams.search,
      })
  );
  const router = useRouter();

  const debounce = useDebounce(
    postListFilters.search,
    POST_LIST_FILTERS_DEBOUNCE
  );

  const blogPostQuery = api.blogPost.getBlogPosts.useQuery({
    page: activePage,
    perPage: POSTS_PER_PAGE,
    categories: postListFilters.categories,
    search: debounce,
  });

  const handlePostListFiltersChange = async (
    filters: PostListFiltersValues
  ) => {
    setPostListFilters(filters);
    await router.push(
      {
        query: qs.stringify(filters, {
          arrayFormat: "comma",
        }),
      },
      undefined,
      {
        shallow: true,
      }
    );
    setActivePage(0);
  };

  const handlePaginationPageChange = (paginationPage: number) => {
    setActivePage(paginationPage);
    window.scroll(0, 0);
  };

  const totalPages = blogPostQuery.data
    ? Math.ceil(blogPostQuery.data.total / POSTS_PER_PAGE)
    : 0;

  return (
    <Layout>
      <HStack spacing={4} mb={5}>
        <Button onClick={() => router.replace("/login")}>Login</Button>
        <Button onClick={() => router.replace("/register")}>Register</Button>
        <Button onClick={() => router.replace("/user/profile")}>
          User Profile
        </Button>
      </HStack>

      <SearchPost
        filters={postListFilters}
        onFiltersChange={handlePostListFiltersChange}
      />

      <PostList
        posts={blogPostQuery.data?.data || []}
        isLoading={blogPostQuery.isLoading}
        isError={!!blogPostQuery.isError}
        blogPostPerPage={POSTS_PER_PAGE}
      />
      {totalPages > 0 && (
        <Pagination
          paginationPages={totalPages}
          activePage={activePage}
          handlePaginationPageChange={handlePaginationPageChange}
        />
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
