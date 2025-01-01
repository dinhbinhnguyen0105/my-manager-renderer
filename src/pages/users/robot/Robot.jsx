import React, { useEffect, useState } from "react";

function Robot() {
    const [UIDsState, setUIDsState] = useState([]);

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-uid" });
            window.electronAPIs.on("list-of-uid", (event, response) => {
                setUIDsState(response.data);
            });
        } else {
            setUIDsState([
                { date: "01-02-2024", username: "Nguyễn Văn A", uid: "0", status: true, sign_in: true, type: "discussion-re", note: "Note A" },
                { date: "03-02-2024", username: "Nguyễn Văn C", uid: "2", status: true, sign_in: true, type: "discussion-misc", note: "Note C" },
                { date: "04-02-2024", username: "Nguyễn Văn D", uid: "3", status: false, sign_in: true, type: "marketplace-misc", note: "Note D" },
                { username: "Nguyễn Văn B", uid: "1", status: true, sign_in: true, type: "marketplace-re", note: "Note E" },
                { username: "Nguyễn Văn E", uid: "4", status: true, sign_in: false, type: "For rent", robot: { selected: true }, },
            ]);
        };
    }, []);


    return (
        <div className="content__robot">
            <RobotUIDs uids={UIDsState}/>
            <div className="content__robot__settings"></div>
        </div>
    );
}

function RobotUIDs({ uids }) {
    const selectUIDHandler = e => {
        const currentUID = e.target.closest(".table__body__row").getAttribute("data-uid");
        if(window.electronAPIs) {
            window.electronAPIs.send("action", {
                action: "edit-uid",
                uid: currentUID,
                data: {
                    robot: {
                        selected: e.target.checked,
                    },
                },
            });
        };
    };
    return (
        <div className="content__robot__udis">
            <table className="uids__table">
                <thead className="uids__table__head">
                    <tr>
                        <th className="uid__num">N.O</th>
                        <th className="uid__username">username</th>
                        <th className="uid__type">type</th>
                        <th className="uid__note">note</th>
                    </tr>
                </thead>
                <tbody className="uids__table__body">
                    {
                        uids.map((uid, index) => (
                            <tr
                                key={index}
                                className={`table__body__row${
                                    (!uid.status ? " error" : "") ||
                                    (!uid.sign_in ? " warn" : "")
                                }`}
                                data-uid={uid.uid}
                            >
                                <td className="uid__num">{index + 1}</td>
                                <td className="uid__username">{uid.username}</td>
                                <td className="uid__type">{uid.type}</td>
                                <td className="uid__note">{uid.note}</td>
                                <td className="uid__select">
                                    <input 
                                        type="checkbox"
                                        name=""
                                        id="" 
                                        onChange={selectUIDHandler}
                                        checked={uid.robot && uid.robot.selected}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Robot;