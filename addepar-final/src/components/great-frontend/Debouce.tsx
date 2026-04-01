import type { FC } from "react";

const Debounce: FC<{ func: any, wait: any }> = ({func, wait}) => {
    let timeoutID: any = null;
    const debounce = (...args: any) => {
        // Keep a reference to `this` so that
        // func.apply() can access it.
        const context = this;
        clearTimeout(timeoutID);

        timeoutID = setTimeout(() => {
            timeoutID = null; // Not strictly necessary but good to do this.
            func.apply(context, args);
        }, wait);
    };

    debounce(func, wait)

    return (
        <>
            <div>Running debounce</div>
        </>
    )
}

export default Debounce;