import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import './sidebarItem.css';

interface SidebarItemProps {
    item: { 
        icon: string; 
        title: string;
        path: string;
        children?: SidebarItemProps["item"][]; 
    };
}

const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
    const [open, setOpen] = useState(false);

    if (item.children) {
        return (
            <div className={`sidebar-item ${open ? 'sidebar-item--open' : ''}`}>
                <div 
                    className="sidebar-item__header"
                    onClick={() => setOpen(!open)}
                >
                    <span className="sidebar-item__label">
                        {item.icon && <i className={item.icon} />}
                        {item.title}
                    </span>
                    <span className="sidebar-item__chevron">{open ? '▲' : '▼'}</span>
                </div>
                {open && (
                    <div className="sidebar-item__children">
                        {item.children.map((child, index) => (
                            <SidebarItem key={index} item={child} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link 
            to={item.path || '/'} 
            className="sidebar-item__link"
        >
            {item.icon && <i className={item.icon} />}
            {item.title}
        </Link>
    );
}

export default SidebarItem;