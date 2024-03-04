import { Provider } from "react-redux";
/* import store from "@/redux/store"; */
import { store } from "@/redux/store";
import "@/styles/globals.css";
import Footer from "@/Components/footer";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="relative min-h-screen">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
