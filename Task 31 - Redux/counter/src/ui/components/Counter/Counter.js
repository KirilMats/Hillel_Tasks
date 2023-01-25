import c from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";
import {counterSelector} from "../../../business/redux/reducers/counter/selector";
import {decrement, increment} from "../../../business/redux/reducers/counter/slice";

const Counter = (props) => {
    const value = useSelector(counterSelector.value);
    const dispatch = useDispatch();
    const handleDecreaseCounter = () => {
        dispatch(decrement());
    }
    const handleIncreaseCounter = () => {
        dispatch(increment());
    }

    return (
        <div className={c.counter}>
            <span>Value: {value}</span>
            <div className={c.counterControls}>
                <button className={c.decreaseCounter} onClick={handleDecreaseCounter}>-</button>
                <button className={c.increaseCounter} onClick={handleIncreaseCounter}>+</button>
            </div>
        </div>
    )
}

export default Counter;