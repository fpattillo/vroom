import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from "../components/theme-provider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
