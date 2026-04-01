import { useState, type FC } from "react";
import BarChart from "./BarChart";

enum ManipulateType {
    BUBBLESORT,
    MERGESORT,
    SELECTIONSORT,
    INSERTIONSORT,
    QUICKSORT,
    REMOVEONEBYONE
}

const ArraySort: FC = () => {
    const [arrayInput, setArrayInput] = useState('');
    const [isSortSumbitted, setIsSortSumbitted] = useState(false);
    const [array, setArray] = useState<number[]>([]);

    const handleVisualisation = (): void => {
        // 1. convert string input into an array
        const arr = formatStringInputToArray(arrayInput);
        setArray(arr);

        // 2. sumbit manipulate
        setIsSortSumbitted(true);

        // 3. begin manipulateing the array 
        // 5. visualise each part of the manipulate
        // note - since array is state it should update the chart in real time
        manipulateArray(ManipulateType.BUBBLESORT, arr);
    }


    const removeOneByOne = async (arr: number[]) => {
        while (arr.length !== 0) {
            arr = arr.slice(0, arr.length - 1);
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    const bubbleSort = async (arr: number[]) => {
        const res = [...arr];
        let swapped = true;
        while (swapped) {
            swapped = false;
            for (let i = 0; i < res.length; i++) {
                if (res[i] > res[i + 1]) {
                    [res[i+1], res[i]] = [res[i], res[i+1]];
                    swapped = true;
                    setArray([...res]);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        return arr;
    }

    const quickSort = (arr: number[]) => {
        if (arr.length <= 1) return arr;
      
        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];
      
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] < pivot) left.push(arr[i]);
          else right.push(arr[i]);
        }
      
        return [...quickSort(left), pivot, ...quickSort(right)];
    }

    const manipulateArray = (manipulatingType: ManipulateType, arr: number[]) => {
        switch (manipulatingType) {
            case (ManipulateType.REMOVEONEBYONE):
                removeOneByOne(arr);
                break
            case (ManipulateType.BUBBLESORT): 
                bubbleSort(arr);
                break
            default:
                break
        }
    }

    const formatStringInputToArray = (arrayInput: string): number[] => {
        let formattedString = arrayInput;
        if (arrayInput.charAt(0) === '[') {
            formattedString = formattedString.slice(1, formattedString.length);
        }

        if (arrayInput.charAt(arrayInput.length - 1) === ']') {
            formattedString = formattedString.slice(0, formattedString.length - 1);
        }

        return formattedString
            .replaceAll(" ", "")
            .split(",")
            .map((val) => Number(val));
    }


    const updateArrayInput = (event: any) => {
        setArrayInput(event.target.value);
    }

    const handleVisualiseAnother = () => {
        setIsSortSumbitted(prev => !prev);
    }

    return (
        <>
            <h1>Visualise Array Sort</h1>
            {!isSortSumbitted && (
                <>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="array-input">Enter the array below you want to manipulate:</label>
                        <input
                            id="array-input"
                            type="text"
                            value={arrayInput}
                            onChange={updateArrayInput}
                        >
                        </input>
                    </div>
                    <button
                        onClick={handleVisualisation}
                    >Visualise!</button>
                </>
            )}
            {isSortSumbitted && (
                <>
                    <div
                        className="array-visualisation"
                        style={{ height: "20rem", width: "100%" }}
                    >
                        <BarChart arr={array} />
                    </div>
                    <button
                        onClick={handleVisualiseAnother}
                    >Visualise another?</button>
                </>
            )}
        </>
    )
}

export default ArraySort;
