import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { api } from "../utils/api";
import { AuthProvider } from "../providers/AuthProvider";
import React, { type FC, type PropsWithChildren } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
