import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/styles/globals.css";
import Link from "next/link";

// TODO: Make the existing backgroundImg cover the whole screen.
//? White blank string on the bottom for mobile devices

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="full-page-background">
        <div className="overlay">
          <div className="pl-4 pt-2 space-x-4">
            <Link className="text-white no-underline cursor-pointer hover:underline" href="/">
              Home
            </Link>
            <Link className="text-white no-underline cursor-pointer hover:underline" href="/quiz">
              Quiz
            </Link>
            <Link className="text-white no-underline cursor-pointer hover:underline" href="/custom-quiz">
              Make quiz
            </Link>
          </div>

          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
