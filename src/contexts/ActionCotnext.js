import React from "react";
import { createContext, useState } from "react";

const ActionsContext = createContext();

function ActionsProvider({ children }) {
    const [actionsState, setActionsState] = useState({
        checkStatus: null,
        checkSignin: null,
    });

    return (
        <ActionsContext.Provider value={[actionsState, setActionsState]}>
            { children }
        </ActionsContext.Provider>
    );
}

export {
    ActionsContext,
    ActionsProvider,
}