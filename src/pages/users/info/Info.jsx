import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { RenderContext } from "../../../contexts/RenderContext";
import { assets } from "../../../assets/assets";
import "./Info.css";

function UIDInfo() {
    const [{ ...renderState }] = useContext(RenderContext);
    const [UIDInfoState, setUIDInfoState] = useState({
        date: "",
        uid: "",
        username: "",
        status: false,
        sign_in: false,
        type: "",
        note: "",
        groups: [],
    });
    const [inputTypeState, setInputTypeState] = useState(true);
    const [inputNoteState, setInputNoteState] = useState(true);
    const [inputDateState, setInputDateState] = useState(true);
    const [saveBtnDisabledState, setSaveBtnDisabledState] = useState(false);
    const [openBtnDisabledState, setOpenBtnDisabledState] = useState(false);
    const [statusBtnDisabledState, setStatusBtnDisabledState] = useState(false);
    const [signinBtnDisabledState, setSigninBtnDisabledState] = useState(false);
    const [groupBtnDisabledState, setGroupBtnDisabledState] = useState(false);

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", {
                request: "uid-info",
                uid: renderState.uid,
            });
            window.electronAPIs.on("uid-info", (event, response) => {
                setUIDInfoState(response.data);
            });
            window.electronAPIs.on("edit-uid", (event, response) => {
                setSaveBtnDisabledState(false);
            });
            window.electronAPIs.on("open-browser", (event, response => setOpenBtnDisabledState(false)));
            window.electronAPIs.on("check-status", (event, response => setStatusBtnDisabledState(false)));
            window.electronAPIs.on("check-signin", (event, response => setSigninBtnDisabledState(false)));
            window.electronAPIs.on("get-groups", (event, response => setGroupBtnDisabledState(false)));
        } else {
            setUIDInfoState({
                "uid": "100065098422625",
                "username": "Blake Nguyen ",
                "groups": [
                    {
                        "url": "https://www.facebook.com/groups/4158172027576388/",
                        "name": "PHÒNG TRỌ & TÌM VIỆC LÀM ĐÀ LẠT ✅",
                        "members": "13,0K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/975470559939040/",
                        "name": "CHO THUÊ NHÀ NGUYÊN CĂN ĐÀ LẠT ✅",
                        "members": "86,0K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/356237492011374/",
                        "name": "NHÀ VÀ CĂN HỘ CHO THUÊ ĐÀ LẠT/ DALAT HOUSE AND APARTMENT FOR RENT",
                        "members": "32,1K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/199417180998409/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/197827032181580/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/vieclamodalat/",
                        "name": "Việc làm Đà Lạt - Lâm Đồng",
                        "members": "96,9K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/datlamdong/",
                        "name": "Mua bán nhà đất Lâm Đồng",
                        "members": "33,9K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/193488994592239/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/189198418278887/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/187075275236466/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/185568125488433/",
                        "name": "Rao Vặt Đà Lạt",
                        "members": "49,4K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/49dalat/",
                        "name": "Review Đà Lạt- Homestay,Khách Sạn, Villa Giá rẻ",
                        "members": "298,1K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/176563477616121/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/176405521329846/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/176378756322943/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/Nhadatbienhoadongnai/",
                        "name": "Phun Xăm Mày Môi Mí",
                        "members": "10,6K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/vieclamblc/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/169067873274419/",
                        "name": "Khách Sạn, Homestay, Villa Đà Lạt View Đẹp",
                        "members": "81,6K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/nhadatdalatlamdong1/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/153780258052424/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/152719228514595/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/138634450041016/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/homestayviewdepdalat/",
                        "name": "Homestay , Villa , Khách sạn view đẹp Đà Lạt",
                        "members": "427,7K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/136638915125775/",
                        "name": "Nhà Đất Đơn Dương-Đức Trọng Chính Chủ ✅",
                        "members": "9,9K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/135583810395773/",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/timhomestaydalat/",
                        "name": "Homestay, Villa, Khách sạn, Đà Lạt",
                        "members": "27,1K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/Gioithieuvieclamdalat/",
                        "name": "Việc Làm Đà Lạt ✅ - Bất Động Sản Đà Lạt",
                        "members": "87,4K thành viên",
                        "isMarketplace": false
                    },
                    {
                        "url": "https://www.facebook.com/groups/100446247137117/",
                        "isMarketplace": false
                    }
                ],
                "currentgroup": 50,
                "status": true,
                "sign_in": true,
                "type": "discussion"
            });
        }
    }, []);

    const saveBtnHandler = e => {
        const ariaData = e.target.closest(".uid-info__item").getAttribute("data");
        setSaveBtnDisabledState(true);
        if (window.electronAPIs) {
            window.electronAPIs.send("action", {
                action: "edit-uid",
                data: { uid: UIDInfoState.uid, key: ariaData, value: UIDInfoState[ariaData] },
            });
        } else {
            setTimeout(() => {
                setSaveBtnDisabledState(false);
            }, 1000);
        }
    };
    const actionBtnHandler = (action) => {
        if (window.electronAPIs) {
            switch (action) {
                case "open-browser": {
                    setOpenBtnDisabledState(true);
                    break;
                };
                case "check-status": {
                    setStatusBtnDisabledState(true);
                    break;
                };
                case "check-signin": {
                    setSigninBtnDisabledState(true);
                    break;
                };
                case "get-groups": {
                    setGroupBtnDisabledState(true);
                    break;
                };
                default: throw new Error("Invalid action in action btn");
            };
            window.electronAPIs.send("action", {
                action: action,
                uid: UIDInfoState.uid
            })
        };
    }

    return (
        <div className="uid-info">
            <div className="uid-info__item uid-info__date" data="date">
                <label htmlFor="info__date__value" className="info__item__label">date</label>
                <input type="text" id="info__date__value" className="info__item__value" value={UIDInfoState.date} onChange={e => setUIDInfoState(prev => ({ ...prev, date: e.target.value }))} disabled={inputDateState} />
                <div className="uid-info__actions">
                    <button className="uid-info__action" id="action__date-edit" onClick={() => setInputDateState(false)}><img src={assets.uid_info_edit_icon} /></button>
                    <button className="uid-info__action" id="action__date-save" onClick={saveBtnHandler} disabled={saveBtnDisabledState}><img src={assets.uid_info_save_icon} alt="" /></button>
                </div>
            </div>
            <div className="uid-info__item uid-info__uid" data="uid">
                <label htmlFor="info__uid__value" className="info__item__label">UID</label>
                <p id="info__uid__value" className="info__item__value">{UIDInfoState.uid}</p>
                <div className="uid-info__actions">
                    <button className="uid-info__action" onClick={() => actionBtnHandler("open-browser")} disabled={openBtnDisabledState}><img src={assets.uid_info_open_icon} alt="" /></button>
                </div>
            </div>
            <div className="uid-info__item uid-info__username" data="username">
                <label htmlFor="info__username__value" className="info__item__label">username</label>
                <p id="info__username__value" className="info__item__value">{UIDInfoState.username}</p>
            </div>
            <div className="uid-info__item uid-info__status" data="status">
                <label htmlFor="info__status__value" className="info__item__label">status</label>
                <p id="info__status__value" className="info__item__value">{UIDInfoState.status ? "Live" : "Checkpoint"}</p>
                <div className="uid-info__actions">
                    <button className="uid-info__action" onClick={() => actionBtnHandler("check-status")} disabled={statusBtnDisabledState}>
                        <img src={assets.uid_info_status_icon} alt="" />
                    </button>
                </div>
            </div>
            <div className="uid-info__item uid-info__signin" data="signin">
                <label htmlFor="info__signin__value" className="info__item__label">sign in</label>
                <p id="info__signin__value" className="info__item__value">{UIDInfoState.sign_in ? "True" : "False"}</p>
                <div className="uid-info__actions">
                    <button className="uid-info__action" onClick={() => actionBtnHandler("check-signin")} disabled={signinBtnDisabledState}>
                        <img src={assets.uid_info_signin_icon} alt="" />
                        </button>
                </div>
            </div>
            <div className="uid-info__item uid-info__type" data="type">
                <label htmlFor="info__type__value" className="info__item__label">type</label>
                <input type="text" id="info__type__value" className="info__item__value" value={UIDInfoState.type} onChange={e => setUIDInfoState(prev => ({ ...prev, type: e.target.value }))} disabled={inputTypeState} />
                <div className="uid-info__actions">
                    <button className="uid-info__action" id="action__type-edit" onClick={() => setInputTypeState(false)}><img src={assets.uid_info_edit_icon} /></button>
                    <button className="uid-info__action" id="action__type-save" onClick={saveBtnHandler} disabled={saveBtnDisabledState}><img src={assets.uid_info_save_icon} /></button>
                </div>
            </div>
            <div className="uid-info__item uid-info__note" data="note">
                <label htmlFor="info__note__value" className="info__item__label">note</label>
                <input type="text" id="info__note__value" className="info__item__value" value={UIDInfoState.note} onChange={e => setUIDInfoState(prev => ({ ...prev, note: e.target.value }))} disabled={inputNoteState} />
                <div className="uid-info__actions">
                    <button className="uid-info__action" id="action__note-edit" onClick={() => setInputNoteState(false)}><img src={assets.uid_info_edit_icon} /></button>
                    <button className="uid-info__action" id="action__note-save" onClick={saveBtnHandler} disabled={saveBtnDisabledState}><img src={assets.uid_info_save_icon} /></button>
                </div>
            </div>
            <div className="uid-info__item uid-info__groups" data="groups">
                <label htmlFor="info__groups__value" className="info__item__label">Groups</label>
                <div className="info__groups__value info__item__value" id="infor__groups__value">
                    <div className="info__groups__length" >
                        <p>{UIDInfoState.groups ? UIDInfoState.groups.length : "0"}</p>
                    </div>
                </div>
                <div className="uid-info__actions">
                    <button className="uid-info__action" id="action__groups-check" onClick={() => actionBtnHandler("get-groups")} disabled={groupBtnDisabledState}>
                        <img src={assets.uid_info_groups_icon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UIDInfo;