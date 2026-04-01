import { useState, useEffect } from 'react';
import users from '../../data/users';

const STARTING_USERS_PER_PAGE = 5;

export default function DataTable() {
    const [pageNum, setPageNum] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(STARTING_USERS_PER_PAGE);
    const [usersPerPageInput, setUsersPerPageInput] = useState(String(STARTING_USERS_PER_PAGE));
    const [numPages, setNumPages] = useState(Math.ceil(users.length / usersPerPage));

    const decrementPageNum = () => {
        setPageNum(prev => {
            const newPageNum: number = prev -1;
            return newPageNum > 0 && newPageNum < numPages ? newPageNum : prev})
    };
    
    const incrementPageNum = () => {
        setPageNum(prev => prev + 1)
    };

    const updateUsersPerPageInput = (e) => {
        setUsersPerPageInput(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const value = Number(usersPerPageInput);
            if (typeof value === 'number' && value > 0) {
                setUsersPerPage(value);
                setPageNum(1);
                setNumPages(Math.ceil(users.length / value));
            }
        }, 500)
        return () => clearTimeout(timeout)
    }, [usersPerPageInput])

    return (
        <div>
            <h1>Data Table</h1>
            <table>
                <thead>
                    <tr>
                        {[
                            { label: 'ID', key: 'id' },
                            { label: 'Name', key: 'name' },
                            { label: 'Age', key: 'age' },
                            { label: 'Occupation', key: 'occupation' },
                        ].map(({ label, key }) => (
                            <th key={key}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.slice((pageNum - 1) * usersPerPage, pageNum * usersPerPage).map(({ id, name, age, occupation }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{occupation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: "flex", height: "2rem" }}>
                <button onClick={decrementPageNum}>Prev</button>
                <p>Page number: {pageNum} / {numPages}</p>
                <button onClick={incrementPageNum}>Next</button>
            </div>

            <div style={{ padding: "1rem 0" }}>
                <input
                    type="input"
                    style={{ width: "1rem", margin: "0 1rem 0 0" }}
                    value={usersPerPageInput}
                    onChange={updateUsersPerPageInput}>
                </input>
                <label>Number of users per page</label>
            </div>
        </div>
    );
}
