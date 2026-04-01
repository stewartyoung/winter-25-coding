import type { FC } from "react";

const FlattenArray: FC<{ value: any[] }> = ({ value }) => {
    const flatten = (value: any[]): number[] => {
        console.log("value")
        console.log(value)
        const res: number[] = flattenArrayItems(value);
        console.log("res")
        console.log(res)
        return res;
    }

    const flattenArrayItems = (value: any[]): number[] => {
        let flattened: number[] = [];

        value.forEach(item => {
            if (typeof item !== 'object') {
                flattened.push(item)
            } else {
                flattened = [...flattened, ...flattenArrayItems(item)]
            }
        })

        return flattened;
    }

    return (
        <>
            <div>Input: {JSON.stringify(value)}</div>
            <div>Flattened: {JSON.stringify(flatten(value))}</div>
        </>
    )
}

export default FlattenArray;