import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  session: any; // Assuming session is of any type, replace with the correct type if known
}

const Providers: React.FC<ProvidersProps> = ({ children, session }) => {
  return (
    <NextUIProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark", "modern"]}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </NextThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
