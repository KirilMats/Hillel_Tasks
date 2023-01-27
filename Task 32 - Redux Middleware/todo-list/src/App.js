import c from './App.module.css';
import TodoListApp from "./ui/components/TodoListApp/TodoListApp";
import Header from "./ui/components/Header/Header";
import {Routes, Route} from "react-router";
import ErrorBoundary from "./ui/components/ErrorBoundary/ErrorBoundary";
import TestErrorBoundary from "./ui/components/TestErrorBoundary/TestErrorBoundary";
import {Provider} from "react-redux";
import store from "./business/redux/store";
import Home from "./ui/components/Home/Home";

const App = (props) => {
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <div className={c.App}>
                    <Header />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<TodoListApp />} path="/todo" />
                        <Route element={<TestErrorBoundary />} path="/test" />
                    </Routes>
                </div>
            </ErrorBoundary>
        </Provider>
    );
}

export default App;
