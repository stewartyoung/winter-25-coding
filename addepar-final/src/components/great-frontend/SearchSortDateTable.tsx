import { useState, type FC, useEffect } from "react";

const SearchSortDataTable: FC = () => {
    const [tick, setTick] = useState('');
    
    useEffect(() => {
            const interval = setInterval(() => setTick(new Date().toLocaleString()));
            return () => clearInterval(interval);
        }
    )
    
    const getFilteredRows = (rows: any[], filterTerm: string) => {
        return rows.filter((row:any) => JSON.stringify(row).includes(filterTerm))
    }

    return (
        <>
            <h1>Search Sort Data Table</h1>
            <p>{tick}</p>
        </>
    )
}



export default SearchSortDataTable;