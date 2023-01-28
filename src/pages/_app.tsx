import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { api } from "../utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
