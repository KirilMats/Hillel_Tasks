import c from './App.module.css';
import TodoListApp from "./components/TodoListApp/TodoListApp";
import Header from "./components/Header/Header";
import Contacts from "./components/Contacts/Contacts";
import {Routes, Route} from "react-router";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import TestErrorBoundary from "./components/TestErrorBoundary/TestErrorBoundary";

const App = (props) => {
    return (
        <ErrorBoundary>
            <div className={c.App}>
                <Header />
                <Routes>
                    <Route element={<TodoListApp />} path="/home" />
                    <Route element={<Contacts />} path="/contacts" />
                    <Route element={<TestErrorBoundary />} path="/test" />
                </Routes>
            </div>
        </ErrorBoundary>
    );
}

export default App;
