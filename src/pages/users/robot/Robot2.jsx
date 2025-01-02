import React, { Fragment, useCallback, useEffect, useState } from "react";
import { updateDataHandler } from "../../../utils/utils";
import "./Robot.css"

function Robot() {
    const [UIDsState, setUIDsState] = useState([]);
    const [robotActionState, setRobotActionState] = useState([]);

    const fetchUIDs = useCallback(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-uid" });
            window.electronAPIs.on("list-of-uid", (_, response) => {
                setUIDsState(response.data);
            });
        } else {
            fetch("http://localhost:3001/uids")
                .then(res => res.json())
                .then(res => {
                    setUIDsState(res);
                })
                .catch(err => new Error(err));
        };
    }, []);

    useEffect(() => {
        fetchUIDs();
    }, []);

    const updateUIDsHandler = useCallback(payload => {
        setUIDsState(prev => (
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

    }, []);

    return (
        <div className="content__robot">
            <RobotUIDs
                uids={UIDsState}
                updateUIDsHandler={updateUIDsHandler}
                robotActionState={robotActionState}
                setRobotActionState={setRobotActionState}
            />
        </div>
    );
}

function RobotUIDs({ uids, updateUIDsHandler, robotActionState, setRobotActionState }) {
    const [miscState, setMiscState] = useState([]);
    const [reState, setReState] = useState([]);
    const [fashionnState, setFashionState] = useState([]);

    const fetchProducts = useCallback(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-product", option: "re" });
            window.electronAPIs.send("request", { request: "list-of-product", option: "misc" });
            window.electronAPIs.send("request", { request: "list-of-product", option: "fashion" });
            window.electronAPIs.on("list-of-product-re", (_, response) => setReState(response.data));
            window.electronAPIs.on("list-of-product-misc", (_, response) => setMiscState(response.data));
            window.electronAPIs.on("list-of-product-fashion", (_, response) => setFashionState(response.data));
        } else {
            fetch("http://localhost:3001/products")
                .then(res => res.json())
                .then(res => {
                    if (res["real-estate"]) { setReState(res["real-estate"]); }
                    else { setReState([]); };
                    if (res.misc) { setMiscState(res.misc); }
                    else { setMiscState([]); };

                })
                .catch(err => new Error(err));
        }
    }, []);

    const selectedUIDHandler = e => {
        const currentUID = e.target.closest(".table__body__row").getAttribute("data-uid");
        updateUIDsHandler({
            uid: currentUID,
            data: {
                robot: {
                    selected: e.target.checked
                }
            }
        });
    }

    useEffect(() => { fetchProducts(); }, []);

    return (
        <div className="content__robot__uids">
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
                    {uids.map((uid, index) => (
                        <React.Fragment key={index}>
                            <tr
                                className={`table__body__row${(!uid.status ? " error" : "") || (!uid.sign_in ? " warn" : "")}`}
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
                                        onChange={selectedUIDHandler}
                                        checked={uid.robot && uid.robot.selected}
                                    />
                                </td>
                            </tr>
                            {
                                (uid.robot && uid.robot.selected) && (
                                    <tr className="robot__uid__setting" data-uid={uid.uid}>
                                        <td colSpan={5}>
                                            <UIDSetting uid={uid} />
                                        </td>
                                    </tr>
                                )
                            }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UIDSetting({ uid }) {

    return (
        <React.Fragment>
            <h3>UID: {uid.uid}</h3>
            <div className="setting__item__prev">
                {(uid?.robot?.prev?.products && uid.robot.prev.products.length > 0) && (
                    <>
                        <p>{uid.robot.prev.products.length} lasted products</p>
                        <ul className="setting__prev-products">
                            {
                                uid.robot.prev.products.map((prevProducts, index) => (
                                    <li key={index}>{prevProducts}</li>
                                ))
                            }
                        </ul>
                    </>
                )}
            </div>
            <div className="uid__setting__item">
                <button>add</button>

            </div>
        </React.Fragment>
    );
}

export default Robot;

/**
{
    robot: {
        selected: true,
        actions: [
            {product: "", location: ""}
        ],
        prev: {
            products: [],
            location: [
                { group: ""},
                { marketplace: true}
            ],
        }
    }
}
 */