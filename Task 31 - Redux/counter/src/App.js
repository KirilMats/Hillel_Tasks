import './App.css';
import Counter from "./ui/components/Counter/Counter";
import { Provider } from "react-redux";
import store from "./business/redux/store";

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Counter />
        </div>
      </Provider>
  );
}

export default App;
