import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { ThemeProvider } from "~/components/theme-provider";

import { Toaster } from "~/ui/toaster";
import { api } from "~/utils/api";

import "~/styles/globals.css";

import { store } from "../redux/store";
import { Provider } from "react-redux";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};

export default api.withTRPC(App);
