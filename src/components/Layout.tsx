import { Container } from "@chakra-ui/react";
import React, { type FC, type PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <Container mt={24}>{children}</Container>;
};
