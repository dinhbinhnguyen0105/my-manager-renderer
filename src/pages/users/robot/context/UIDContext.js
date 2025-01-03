import React from "react";
import { createContext, useState, useEffect } from "react";

const UIDContext = createContext();
function UIDProvider({ children }) {
    const [UIDs, setUIDs] = useState();
    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-uid" });
            window.electronAPIs.on("list-of-uid", (_, response) => {
                setUIDs(response.data);
            });
        } else {
            fetch("http://localhost:3001/uids")
                .then(res => res.json())
                .then(res => {
                    setUIDs(res);
                })
                .catch(err => new Error(err));
        };
    }, []);
    return (
        <UIDContext.Provider value={[UIDs, setUIDs]}>
            { children }
        </UIDContext.Provider>
    );
}

export {
    UIDContext,
    UIDProvider,
};