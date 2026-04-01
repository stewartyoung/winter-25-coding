import type { FC } from "react";
import './dynamicSiderbar.css';
import SidebarItem from "./SidebarItem";
import items from './sidebar';

const DynamicSideBar: FC = () => {
    return (
        <div className="dynamic-sidebar__container">
            <nav className="dynamic-sidebar__list">
                {items.map((item, idx) => (
                    <SidebarItem key={idx} item={item} />
                ))}
            </nav>
        </div>
    );
};

export default DynamicSideBar;