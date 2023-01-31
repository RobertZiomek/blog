import { useToast as useChakraToast } from "@chakra-ui/react";

interface ToastOptions {
  title: string;
  status: "error" | "success";
}

const DEFAULT_TOAST_DURATION = 3000;

export const useToast = () => {
  const chakraToast = useChakraToast();

  return (options: ToastOptions) => {
    chakraToast({
      duration: DEFAULT_TOAST_DURATION,
      isClosable: true,
      ...options,
    });
  };
};
