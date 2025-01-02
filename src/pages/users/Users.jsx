import React from "react";
import { useContext } from "react";

import { RenderContext } from "../../contexts/RenderContext";
import List from "./list/List";
import Create from "./create/Create";
import UIDInfo from "./info/Info";
import Robot from "./robot/Robot2";
// import Robot from "./robot/Robot";
import "./Users.css";

function Users() {
    const [{ ...renderState }] = useContext(RenderContext);
    const Content = () => {
        switch (renderState.content) {
            case "list-of-uid":
                return <List />
            case "create-new-user":
                return <Create />;
            case "uid-info":
                return <UIDInfo />;
            case "robot":
                return <Robot />;
        }
    }

    return (
        <div className="content">
            <Content />
        </div>
    );
}



export default Users;
