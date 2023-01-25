import c from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={c.header}>
            <NavLink className={({ isActive }) => (isActive ? c.active : c.inactive)} to="/todo">TodoList</NavLink>
            <NavLink className={({ isActive }) => (isActive ? c.active : c.inactive)} to="/test">Test Error Boundary</NavLink>
        </div>
    )
}

export default Header;