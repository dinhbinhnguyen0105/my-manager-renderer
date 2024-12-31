import React, { useEffect, useState } from "react";

function Create() {
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
    const [messageState, setMessageState] = useState("");
    const [typeState, setTypeState] = useState("");

    const saveActionHandler = () => {
        if (window.electronAPIs) {
            setSavebtnState(false);
            window.electronAPIs.send("action", {
                action: "create-uid",
                data: {
                    date: dateState,
                    uid: uidState,
                    username: usernameState,
                    password: passwordState,
                    email: emailState,
                    phonenumber: phonenumberState,
                    twofa: twofaState,
                    type: typeState
                },
            });
        } else {
            setSavebtnState(false);
        }
    };

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.on("create-uid", (event, data) => {
                setMessageState(data.message);
                setSavebtnState(true);
            });
        } else {
            setTimeout(() => setSavebtnState(true), 3000);
        }
    }, [savebtnState]);

    return (
        <div className="create-uid">
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
            <div className="create-user__item create-user__type">
                <label className="create-user__label create-user__type-label">
                    type
                </label>
                <input type="text" className="create-user__input create-user__type-input" onChange={e => setTypeState(e.target.value)} value={typeState} />
            </div>
            <div className="create-user__item create-user__actions">
                <button className={`create-user__action create-user__action__save${savebtnState ? "" : " disabled"}`} onClick={savebtnState ? saveActionHandler : null}>{savebtnState ? "Save" : "Saving..."}</button>
            </div>
            <span className="message">{messageState}</span>
        </div>
    );
}

export default Create;