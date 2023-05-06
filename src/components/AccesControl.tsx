import { useRouter } from "next/router";
import React, { type FC, type PropsWithChildren, useLayoutEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface AccessControlProps extends PropsWithChildren {
  isAuthorized: boolean;
}

export const AccessControl: FC<AccessControlProps> = ({
  isAuthorized,
  children,
}) => {
  const auth = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuthorized && !auth.accessToken) {
      router.replace("/login");
    } else if (!isAuthorized && auth.accessToken) {
      router.replace("/");
    }
  }, []);

  if (isAuthorized && !auth.accessToken) {
    return null;
  }

  if (!isAuthorized && auth.accessToken) {
    return null;
  }

  return <>{children}</>;
};
