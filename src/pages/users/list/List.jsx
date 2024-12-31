import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../../assets/assets";
import { ActionsContext } from "../../../contexts/ActionCotnext";
import "./List.css";

function ListTable() {
    const [listOfUserState, setListOfUserState] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", {
                request: "list-of-uid",
            });
            window.electronAPIs.on("list-of-uid", (event, response) => {
                setListOfUserState(response.data);
            });
        } else {
            setListOfUserState([
                { date: "01-02-2024", username: "Nguyễn Văn A", uid: "0", status: true, sign_in: true, type: "For sell", note: "Note A" },
                { date: "03-02-2024", username: "Nguyễn Văn C", uid: "2", status: true, sign_in: true, type: "For rent", note: "Note C" },
                { date: "04-02-2024", username: "Nguyễn Văn D", uid: "3", status: false, sign_in: true, type: "For sell", note: "Note D" },
                { username: "Nguyễn Văn B", uid: "1", status: true, sign_in: true, type: "For sell", note: "Note B" },
                { username: "Nguyễn Văn E", uid: "4", status: true, sign_in: false, type: "For rent", },
            ]);
        }
    }, []);

    const sortList = (key) => {
        const sortedList = [...listOfUserState].sort((a, b) => {
            if (!(key in a)) a[key] = "";
            if (!(key in b)) b[key] = "";

            if (typeof a[key] === "string" && typeof b[key] === "string") {
                return sortConfig.ascending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            } else {
                return sortConfig.ascending ? (a[key] < b[key] ? -1 : 1) : (a[key] > b[key] ? -1 : 1);
            }
        });
        setListOfUserState(sortedList);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    const actionsHandler = (e, action) => {
        const currentRowElm = e.target.closest("tr");
        const uid = currentRowElm.getAttribute("uid-data");
        if (window.electronAPIs) {
            switch (action) {
                case "open-browser":
                    break;
                case "delete-browser":
                    currentRowElm.remove();
                    break;
            }
            window.electronAPIs.send("action", { action, uid });
        }
        const rowElms = document.querySelectorAll(".content .content__list .content__list__table .row");
        [...rowElms].forEach(elm => elm.classList.remove("active"));
        currentRowElm.classList.add("active")
    };

    return (
        <div className="content__list">
            <table className="content__list__table">
                <thead>
                    <tr>
                        <th className="user-info__num table__header">N.O</th>
                        <th className="user-info__date table__header" onClick={() => sortList("date")}>Date</th>
                        <th className="user-info__status table__header" onClick={() => sortList("status")}>Status</th>
                        <th className="user-info__sign-in table__header" onClick={() => sortList("sign_in")}>Sign in</th>
                        <th className="user-info__username table__header" onClick={() => sortList("username")}>Username</th>
                        <th className="user-info__uid table__header" onClick={() => sortList("uid")}>UID</th>
                        <th className="user-info__type table__header" onClick={() => sortList("type")}>Type</th>
                        <th className="user-info__note table__header" onClick={() => sortList("note")}>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfUserState.map((userInfo, index) => (
                        <tr
                            key={index}
                            className={`row${(!userInfo.status ? " error" : "") || (!userInfo.sign_in ? " warn" : "")}`}
                            uid-data={userInfo.uid}
                        >
                            <td className="user-info__num col__num">{index}</td>
                            <td className="user-info__date col__date">{userInfo.date}</td>
                            <td className="user-info__status col__status">{userInfo.status ? "True" : "False"}</td>
                            <td className="user-info__sign-in col__sign-in">{userInfo.sign_in ? "True" : "False"}</td>
                            <td className="user-info__username col__username">{userInfo.username}</td>
                            <td className="user-info__uid col__uid">{userInfo.uid}</td>
                            <td className="user-info__type col__type">{userInfo.type}</td>
                            <td className="user-info__note col__note">{userInfo.note}</td>
                            <td className="user-info__actions col__actions">
                                <button className="actions__open" onClick={e => actionsHandler(e, "open-browser")}><img src={assets.open_repo_icon} alt="" /></button>
                                <button className="actions__del" onDoubleClick={e => actionsHandler(e, "delete-browser")}><img src={assets.delete_repo_icon} alt="" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ListHeader() {
    const [checkStatusState, setCheckStatusState] = useState(false);
    const [checkSignState, setCheckSignState] = useState(false);
    const [actionsState, setActionsState] = useContext(ActionsContext);

    const actionClickHandler = e => {
        const contentActionElm = e.target.closest(".content__action");
        const ariaAction = contentActionElm.getAttribute("aria-label");
        if (window.electronAPIs) {
            window.electronAPIs.send("action", { action: ariaAction });
        }
        if (ariaAction === "check-status") {
            setActionsState(prev => ({
                ...prev,
                checkStatus: true,
            }));
        } else if (ariaAction === "check-signin") {
            setActionsState(prev => ({
                ...prev,
                checkSignin: true,
            }));
        }
    };

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.on("check-status", (event, data) => {
                setActionsState(prev => ({
                    ...prev,
                    checkStatus: false,
                }));
                
            });
            window.electronAPIs.on("check-signin", (event, data) => {
                setActionsState(prev => ({
                    ...prev,
                    checkSignin: false,
                }));
            });
        }
    }, []);

    return (
        <div className="content__actions">
            <button
                className={`content__action${checkStatusState ? " focus" : ""}`}
                onMouseEnter={() => setCheckStatusState(true)}
                onMouseLeave={() => setCheckStatusState(false)}
                aria-label="check-status"
                onClick={actionClickHandler}
                disabled={actionsState.checkStatus}
            >
                <img src={assets.check_solar_icon} alt="" />
                {checkStatusState ? <p>Check status all user</p> : null}
            </button>
            <button
                className={`content__action${checkSignState ? " focus" : ""}`}
                onMouseEnter={() => setCheckSignState(true)}
                onMouseLeave={() => setCheckSignState(false)}
                aria-label="check-signin"
                onClick={actionClickHandler}
                disabled={actionsState.checkSignin}
            >
                <img src={assets.signin_icon} alt="" />
                {checkSignState ? <p>Check sign in all user</p> : null}
            </button>
        </div>
    );
}

function List() {
    return (
        <>
            <ListHeader />
            <ListTable />
        </>
    );
}

export default List;