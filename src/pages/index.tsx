import { Button, HStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Posts } from "../components/Post";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { BlogPostCategory } from "../types/blogPost";
import SearchPost from "../components/SearchPost";
import { usePagination } from "../hooks/usePagination";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";

const HomePage: NextPage = () => {
  const [paginationPage, setPaginationPage] = useState(0);
  const [searchActive, SetSearchActive] = useState(false);
  const [searchCategory, setSearchCategory] = useState<BlogPostCategory[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const debounce = useDebounce(searchWord, 500);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const searchParam = params.get("search");
    if (searchParam) {
      setSearchWord(searchParam);
    }

    const categoryParam = params.get("category");
    if (categoryParam !== null) {
      const validCategories = Object.values(BlogPostCategory);
      if (validCategories.includes(categoryParam as BlogPostCategory)) {
        const categoryArray: BlogPostCategory[] = [
          categoryParam as BlogPostCategory,
        ];
        setSearchCategory(categoryArray);
      }
    }
  }, []);

  const POSTS_PER_PAGE = 8;

  const { data, isLoading, error } = api.blogPost.getBlogPosts.useQuery({
    page: paginationPage,
    perPage: POSTS_PER_PAGE,
    categories: searchCategory,
    search: debounce,
  });
  const handlePaginationPageChange = (paginationPage: number) => {
    setPaginationPage(paginationPage);
  };
  const paginationPosts = usePagination(paginationPage, data?.total);
  const handleSearchCategory = (category: BlogPostCategory[]) => {
    setSearchCategory(category);
    history.pushState(
      null,
      "search",
      `?search=${searchWord}&category=${searchCategory}`
    );
  };
  const handleSearchWord = (word: string) => {
    setSearchWord(word);
    history.pushState(
      null,
      "search",
      `?search=${searchWord}&category=${searchCategory}`
    );
  };

  return (
    <Layout>
      <HStack spacing={4} mb={5}>
        <Button onClick={() => router.replace("/login")}>Login</Button>
        <Button onClick={() => router.replace("/register")}>Register</Button>
        <Button onClick={() => router.replace("/user/profile")}>
          User Profile
        </Button>
        <Button
          onClick={() => {
            SetSearchActive(!searchActive);
            history.pushState(null, "search", `?search`);
          }}
        >
          Search
        </Button>
      </HStack>
      {searchActive ? (
        <SearchPost
          handleSearchCategory={handleSearchCategory}
          handleSearchWord={handleSearchWord}
          handlePaginationPageChange={handlePaginationPageChange}
        />
      ) : null}
      <Posts
        postsQuery={data?.data}
        paginationPage={paginationPage}
        postsTotal={data?.total}
        isLoading={isLoading}
        error={error}
      />
      {data?.total ? (
        <Pagination
          paginationPosts={paginationPosts}
          handlePaginationPageChange={handlePaginationPageChange}
        />
      ) : null}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
