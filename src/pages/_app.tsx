import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { api } from "../utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
