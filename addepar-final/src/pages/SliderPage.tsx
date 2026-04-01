import type { FC } from "react";
import DumbSlider from "../components/addepar/DumbSlider";

const SliderPage: FC = () => {
    return (
        <>
            <DumbSlider min={0} max={10000} />
        </>
    )
}

export default SliderPage;