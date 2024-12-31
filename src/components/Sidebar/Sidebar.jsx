import React, { useState, useContext, useEffect } from "react";

import { RenderContext } from "../../contexts/RenderContext";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

function Sidebar() {
    const [renderContext, setRenderState] = useContext(RenderContext);
    const [minimizeState, setMinimizeState] = useState(false);

    const handleSidebarItemClick = (e) => {
        const currentSidebarItemElm = e.target.closest(".sidebar__item");
        const ariaData = currentSidebarItemElm.getAttribute("data-content");
        setRenderState(prevState => ({ ...prevState, content: ariaData }));
    };

    const SidebarHeader = ({ title }) => (
        <div className="sidebar__header" onClick={() => setMinimizeState(!minimizeState)}>
            <div className="sidebar__header__title"><h2>{title}</h2></div>
        </div>
    );

    const renderSidebarItems = (items) => (
        <>
            {items.map(item => (
                <div
                    key={item.data}
                    className={`sidebar__item ${renderContext.content === item.data ? "active" : ""}`}
                    data-content={item.data}
                    onClick={handleSidebarItemClick}
                >
                    <div className="sidebar__icon"><img src={assets[item.icon]} alt={item.label} /></div>
                    {minimizeState && <div className="sidebar__item__label"><p>{item.label}</p></div>}
                </div>
            ))}
        </>
    );

    const sidebarContent = {
        users: [
            { data: "list-of-uid", icon: "list_solar_icon", label: "List of user" },
            { data: "create-new-user", icon: "add_solar_icon", label: "Create a new user" },
        ],
        marketplace: [],
        home: []
    };


    return (
        <div className={`sidebar ${!minimizeState ? "minimize" : ""}`}>
            <SidebarHeader title={renderContext.page.charAt(0).toUpperCase() + renderContext.page.slice(1)} />
            <div className="sidebar__items">
                {renderSidebarItems(sidebarContent[renderContext.page] || [])}
            </div>
        </div>
    );
}

export default Sidebar;
