import React, { useCallback, useEffect } from "react";
import { useContext } from "react";

import UIDSetting from "./UIDSetting";
import { UIDContext } from "../context/UIDContext";
import { updateDataHandler } from "../../../../utils/utils";

function ListUID() {
    const [UIDs, setUIDs] = useContext(UIDContext);

    const updateUIDsHandler = useCallback(payload => {
        setUIDs(prev => (
            prev.map(UIDInfo => (
                payload.uid === UIDInfo.uid ? updateDataHandler(UIDInfo, payload.data) : UIDInfo
            ))
        ));
        if (window.electronAPIs) {
            window.electronAPIs.send("action", {
                action: "edit-uid",
                uid: payload.uid,
                data: payload.data,
            });
        };
    });

    const selectedUIDHandler = e => {
        const currentUID = e.target.closest(".table__row").getAttribute("data-uid");
        updateUIDsHandler({
            uid: currentUID,
            data: {
                robot: {
                    selected: e.target.checked
                }
            }
        });
    };

    return (
        UIDs && (
            <div className="content__robot__list">
                <table className="robot__table">
                    <thead className="robot__table__head">
                        <tr>
                            <th className="table__col__num">N.o</th>
                            <th className="table__col__username">username</th>
                            <th className="table__col__type">type</th>
                            <th className="table__col__note">note</th>
                        </tr>
                    </thead>
                    <tbody className="robot__table__body">
                        {
                            UIDs.map((uid, index) => (
                                <React.Fragment key={index}>
                                    <tr
                                        className={`table__row${(!uid.status ? " error" : "") || (!uid.sign_in ? " warn" : "")}`}
                                        data-uid={uid.uid}
                                    >
                                        <td className="table__col__num">{index + 1}</td>
                                        <td className="table__col__username">{uid.username}</td>
                                        <td className="table__col__type">{uid.type}</td>
                                        <td className="table__col__note">{uid.note}</td>
                                        <td className="table__col__action">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                                onChange={selectedUIDHandler}
                                                checked={uid.robot && uid.robot.selected || false}
                                            />
                                        </td>
                                    </tr>
                                    {
                                        (uid.robot && uid.robot.selected) && (
                                            <UIDSetting uid={uid} updateUIDsHandler={updateUIDsHandler} />
                                        )
                                    }
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    );
}

export default ListUID;