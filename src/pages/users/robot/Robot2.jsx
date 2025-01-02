import React, { useCallback, useEffect, useState } from "react";
import { updateDataHandler } from "../../../utils/utils";
import "./Robot.css"

function Robot() {
    const [UIDsState, setUIDsState] = useState([]);

    const fetchUIDs = useCallback(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-uid" });
            window.electronAPIs.on("list-of-uid", ({ ...response }) => { setUIDsState(response.data); });
        } else {
            setUIDsState([
                { date: "01-02-2024", username: "Nguyễn Văn A", uid: "0", status: true, sign_in: true, type: "discussion-re", note: "Note A" },
                { date: "03-02-2024", username: "Nguyễn Văn C", uid: "2", status: true, sign_in: true, type: "discussion-misc", note: "Note C" },
                { date: "04-02-2024", username: "Nguyễn Văn D", uid: "3", status: false, sign_in: true, type: "marketplace-misc", note: "Note D" },
                { username: "Nguyễn Văn B", uid: "1", status: true, sign_in: true, type: "marketplace-re", note: "Note E" },
                { username: "Nguyễn Văn E", uid: "4", status: true, sign_in: false, type: "For rent", robot: { selected: true }, },
            ]);
        }
    }, []);

    useEffect(() => {
        fetchUIDs();
    }, [UIDsState]);

    const updateUIDsHandler = useCallback(payload => {
        setUIDsState(prev => (
            prev.map(UIDInfo => (
                payload.uid === UIDInfo.uid ? updateDataHandler(UIDInfo, payload.data) : UIDInfo
            ))
        ));
        if(window.electronAPIs) {
            window.electronAPIs.send("action", {
                action: "edit-uid",
                uid: payload.uid,
                data: payload.data,
            });
        };

    }, []);

    return (
        <div className="content__robot">

        </div>
    );
}

export default Robot;