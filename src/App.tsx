import "./App.css";
import { OrderContextProvider } from "./contexts/OrderContext";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <div style={{ padding: "4rem" }}>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
}

export default App;
