import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/styles/globals.css";
import Link from "next/link";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Link href="/">Home</Link>
      <Link href="/quiz">quiz</Link>
      <Link href="/custom-quiz">custom quiz</Link>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
