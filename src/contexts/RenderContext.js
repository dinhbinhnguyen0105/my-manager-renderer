import React from "react";
import { createContext, useState } from "react";

const RenderContext = createContext();

function RenderProvider({ children }) {
    const [renderState, setRenderState] = useState({
        page: "users",
        content: "create-new-user",
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