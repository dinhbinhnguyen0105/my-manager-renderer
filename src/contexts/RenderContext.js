import React from "react";
import { createContext, useState } from "react";

const RenderContext = createContext();

function RenderProvider({ children }) {
    const [renderState, setRenderState] = useState({
        page: "users",
        // content: "list-of-uid",
        content: "uid-info",
        uid: "100065098422625",
    });

    return (
        <RenderContext.Provider value={[renderState, setRenderState]}>
            { children }
        </RenderContext.Provider>
    );
}

export {
    RenderContext,
    RenderProvider,
};