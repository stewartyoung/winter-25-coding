import { useState, type FC } from "react";

const TodoList: FC = () => {
    const [tasks, setTasks] = useState<{id: number, text: string}[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [nextId, setNextId] = useState(0);

    const deleteTask = (id: number) => {
        setTasks((prevTasks) => {
            return prevTasks.filter(task => task.id !== id);
        })
    }

    const submitTask = () => {
        setTasks((prevTasks) => {
            const formattedValue = inputValue.trim();
            const res = [...prevTasks, {id: nextId, text: formattedValue}];
            return res;
        })
        setNextId(prev => prev + 1);
        setInputValue('')
    }

    return (
        <div>
          <h1>Todo List</h1>
          <div>
            <input 
            type="text" 
            value={inputValue}
            placeholder="Add your task"
            onChange={(e) => setInputValue(e.target.value)}
             />
            <div>
              <button onClick={() => submitTask()}>Submit</button>
            </div>
          </div>
          <ul>
            {tasks.map(({id, text}) => 
            <li>
                <span>{text}</span>
                <button onClick={() => deleteTask(id)}>Delete</button>
            </li>)}
          </ul>
        </div>
      );
}

export default TodoList;