import "./App.css";
import Type from "./pages/OrderPage/Type";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="App">
      <SummaryPage />
      <Type orderType="products" />
    </div>
  );
}

export default App;
