import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { RenderContext } from "../../contexts/RenderContext";
import { assets } from "../../assets/assets";
import "./Users.css";

function Users() {
    const [{ ...renderState }] = useContext(RenderContext);

    switch (renderState.content) {
        case "list-of-user":
            return <ListOfUser />;
        case "create-new-user":
            return <CreateNewUser />;
        // case "check-all-user":
        //     break;
    }
    return (<></>);
}

function ListOfUser() {
    const [listOfUserState, setListOfUserState] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", "list-of-user");
            window.electronAPIs.on("request", (event, data) => {
                setListOfUserState(data);
            });
        } else {
            setListOfUserState([
                { date: "01-02-2024", username: "Nguyễn Văn A", uid: "0", status: true, signed_in: true, note: "For sell" },
                { date: "02-02-2024", username: "Nguyễn Văn B", uid: "1", status: true, signed_in: true, note: "For sell" },
                { date: "03-02-2024", username: "Nguyễn Văn C", uid: "2", status: true, signed_in: true, note: "For rent" },
                { date: "04-02-2024", username: "Nguyễn Văn D", uid: "3", status: false, signed_in: true, note: "For sell" },
                { date: "05-02-2024", username: "Nguyễn Văn E", uid: "4", status: true, signed_in: false, note: "For rent" },
            ]);
        }
    }, []);

    const sortList = (key) => {
        const sortedList = [...listOfUserState].sort((a, b) => {
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
        if (window.electronAPIs) {
            const rowElm = e.target.closest("tr");
            const uid = rowElm.getAttribute("uid-data");
            switch (action) {
                case "open-browser":
                    break;
                case "delete-browser":
                    rowElm.remove();
                    break;
            }
            window.electronAPIs.send("action", { action, uid });
        }
    };

    return (
        <div className="list-of-user">
            <div className="list-of-user__table">
                <table>
                    <thead>
                        <tr>
                            <th className="user-info__num table__header">N.O</th>
                            <th className="user-info__date table__header" onClick={() => sortList("date")}>Date</th>
                            <th className="user-info__status table__header" onClick={() => sortList("status")}>Status</th>
                            <th className="user-info__signed-in table__header" onClick={() => sortList("signed_in")}>Signed in</th>
                            <th className="user-info__username table__header" onClick={() => sortList("username")}>Username</th>
                            <th className="user-info__uid table__header" onClick={() => sortList("uid")}>UID</th>
                            <th className="user-info__note table__header">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfUserState.map((userInfo, index) => (
                            <tr
                                key={index}
                                className={`
                                    ${!userInfo.status ? "error" : ""}
                                    ${!userInfo.signed_in ? " warn" : ""}
                                `}
                                uid-data={userInfo.uid}
                            >
                                <td className="user-info__num col__num">{index}</td>
                                <td className="user-info__date col__date">{userInfo.date}</td>
                                <td className="user-info__status col__status">{userInfo.status ? "True" : "False"}</td>
                                <td className="user-info__signed-in col__signed-in">{userInfo.signed_in ? "True" : "False"}</td>
                                <td className="user-info__username col__username">{userInfo.username}</td>
                                <td className="user-info__uid col__uid">{userInfo.uid}</td>
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
        </div>
    );
}

function CreateNewUser() {
    const [dateState, setDateState] = useState(() => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();

        const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;

        return formattedDate;
    });
    const [uidState, setUidState] = useState("");
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [phonenumberState, setPhonenumberState] = useState("")
    const [twofaState, setTwofaState] = useState("");
    const [savebtnState, setSavebtnState] = useState(true);

    const saveActionHandler = () => {
        if(window.electronAPIs) {
            setSavebtnState(false);
            window.electronAPIs.send("action", {
                action: "create-new-user",
                data: {
                    date: dateState,
                    uid: uidState,
                    username: usernameState,
                    password: passwordState,
                    email: emailState,
                    phonenumber: phonenumberState,
                    twofa: twofaState,
                },
            });
        } else {
            setSavebtnState(false);

        }
    };

    useEffect(() => {
        if(window.electronAPIs) {
            window.electronAPIs.on("action", (event, data) => {
                if(data.action === "create-new-user") {
                    if(data.result === true) setSavebtnState(true)
                }
            });
        } else {
            setTimeout(() => setSavebtnState(true), 3000);
        }
    }, [savebtnState]);

    return (
        <div className="create-new-user">
            <div className="create-user__item create-user__title">
                <h1>Create new user</h1>
            </div>
            <div className="create-user__item create-user__date">
                <label className="create-user__label create-user__date-label">
                    date
                </label>
                <input type="text" className="create-user__input create-user__date-input" value={dateState} disabled />
            </div>
            <div className="create-user__item create-user__uid">
                <label className="create-user__label create-user__uid-label">
                    uid
                </label>
                <input type="text" className="create-user__input create-user__uid-input" onChange={e => setUidState(e.target.value)} value={uidState} />
            </div>
            <div className="create-user__item create-user__username">
                <label className="create-user__label create-user__username-label">
                    username
                </label>
                <input type="text" className="create-user__input create-user__username-input" onChange={e => setUsernameState(e.target.value)} value={usernameState} />
            </div>
            <div className="create-user__item create-user__password">
                <label className="create-user__label create-user__password-label">
                    password
                </label>
                <input type="text" className="create-user__input create-user__password-input" onChange={e => setPasswordState(e.target.value)} value={passwordState} />
            </div>
            <div className="create-user__item create-user__email">
                <label className="create-user__label create-user__email-label">
                    email
                </label>
                <input type="text" className="create-user__input create-user__email-input" onChange={e => setEmailState(e.target.value)} value={emailState} />
            </div>
            <div className="create-user__item create-user__phonenumber">
                <label className="create-user__label create-user__phonenumber-label">
                    phone number
                </label>
                <input type="text" className="create-user__input create-user__phonenumber-input" onChange={e => setPhonenumberState(e.target.value)} value={phonenumberState} />
            </div>
            <div className="create-user__item create-user__twofa">
                <label className="create-user__label create-user__twofa-label">
                    2fa
                </label>
                <input type="text" className="create-user__input create-user__twofa-input" onChange={e => setTwofaState(e.target.value)} value={twofaState} />
            </div>
            <div className="create-user__item create-user__actions">
                <button className={`create-user__action create-user__action__save${savebtnState ? "" : " disabled"}`} onClick={savebtnState ? saveActionHandler : null}>{savebtnState ? "Save" : "Saving..."}</button>
            </div>
        </div>
    );
}

export default Users;
