import { Button, HStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { PostList } from "../components/PostListFilters";
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
  activePage: z.coerce.number().default(0),
});

const parseQueryParams = (
  rawQueryParams: RawQueryParams
): z.infer<typeof queryParamsSchema> => {
  const parsedQueryParams = queryParamsSchema.safeParse({
    categories: rawQueryParams.categories?.split(","),
    search: rawQueryParams.search,
    activePage: rawQueryParams.activePage,
  });

  if (parsedQueryParams.success) {
    return parsedQueryParams.data;
  }

  return {
    activePage: 0,
    categories: [],
    search: "",
  };
};

interface RawQueryParams {
  search?: string;
  categories?: string;
  activePage?: string;
}

const HomePage: NextPage = () => {
  const rawQueryParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as RawQueryParams;

  const parsedQueryParams = parseQueryParams(rawQueryParams);

  const [activePage, setActivePage] = useState(parsedQueryParams.activePage);
  const [postListFilters, setPostListFilters] = useState<PostListFiltersValues>(
    {
      categories: parsedQueryParams.categories,
      search: parsedQueryParams.search,
    }
  );
  const router = useRouter();

  const debouncedPostListFilters = useDebounce(
    postListFilters,
    POST_LIST_FILTERS_DEBOUNCE
  );

  const blogPostQuery = api.blogPost.getBlogPosts.useQuery({
    page: activePage,
    perPage: POSTS_PER_PAGE,
    categories: debouncedPostListFilters.categories,
    search: debouncedPostListFilters.search,
  });

  const handlePostListFiltersChange = async (
    filters: PostListFiltersValues
  ) => {
    setPostListFilters(filters);
    setActivePage(0);
    await router.push(
      {
        query: qs.stringify(
          { ...filters, activePage: 0 },
          {
            arrayFormat: "comma",
          }
        ),
      },

      undefined,
      {
        shallow: true,
      }
    );
  };

  const updateQueryParams = async (
    filters: PostListFiltersValues,
    activePage: number
  ) => {
    await router.push(
      {
        query: qs.stringify(
          { ...filters, activePage },
          {
            arrayFormat: "comma",
          }
        ),
      },

      undefined,
      {
        shallow: true,
      }
    );
  };

  const handlePaginationPageChange = async (page: number) => {
    setActivePage(page);
    window.scroll(0, 0);
    updateQueryParams(postListFilters, page);
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
        <Button onClick={() => router.replace("/addPost")}>Add Post</Button>
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
          totalPages={totalPages}
          activePage={activePage}
          handlePageChange={handlePaginationPageChange}
        />
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
