import { useState, type FC } from "react";
import ControlledInput from "../components/ControlledInput";
import Likes from "../components/Likes";
import Slider from "../components/addepar/Slider";
import Debounce from "../components/great-frontend/Debouce";
import FlattenArray from "../components/great-frontend/FlattenArray";
import TodoList from "../components/great-frontend/TodoList";
import Form from "../components/Form";

const Home: FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
            <div className="card">
                <Slider min={0} max={1000} />
            </div>
            <div className="card">
                <Likes />
            </div>
            <div className="card">
                <ControlledInput />
            </div>
            <div className="card">
                <Form />
            </div>
            <div className="card">
                <FlattenArray value={[1, [2, [3, [4, [5]]]]]} />
            </div>
            <div className="card">
                <TodoList />
            </div>
            <div className="card">
                <Debounce func={() => console.log('hello debounced world')} wait={20000} />
            </div>
        </>
    )

}

export default Home;