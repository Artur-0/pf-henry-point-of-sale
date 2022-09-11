import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";
import Counter from "./Components/Counter/counter";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
import { StoreProvider } from "./GlobalStates/StoreContext";
import GlobalStyle from "./theme/globalStyle.js";
import CashFlow from "./Components/CashFlow/index.jsx";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Route exact path="/kitchen" component={Kitchen} />

      <StoreProvider>
        <Route exact path="/store" component={Store} />
      </StoreProvider>

      <Route exact path="/counter" component={Counter} />

      <Route exact path="/adminProducts" component={AdminProducts} />

      <Route exact path="/cashFlow" component={CashFlow} />
    </div>
  );
}

export default App;
