import Header from "./Components/Header/Header";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import CartContextProvider from "./context/cartContext";

import "./App.css";

function App() {
  const router = useRoutes(routes);

  return (
    <CartContextProvider>
      <div className="app">
        <Header />

        {/* Start Content */}

        {router}

        {/* Finish Content */}
      </div>
    </CartContextProvider>
  );
}

export default App;
