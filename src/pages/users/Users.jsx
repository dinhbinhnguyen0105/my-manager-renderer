import React from "react";
import { useContext } from "react";

import { RenderContext } from "../../contexts/RenderContext";
import List from "./list/List";
import Create from "./create/Create";
import UIDInfo from "./info/Info";
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
                return <UIDInfo />
        }
    }

    return (
        <div className="content">
            <Content />
        </div>
    );
}



export default Users;
