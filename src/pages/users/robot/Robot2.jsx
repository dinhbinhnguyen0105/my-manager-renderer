import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { updateDataHandler } from "../../../utils/utils";
import "./Robot.css"

const RobotActionContext = createContext();
const UIDsContext = createContext();

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

    return (
        <UIDsContext.Provider value={[UIDsState, setUIDsState]}>
            <RobotActionContext.Provider value={[robotActionState, setRobotActionState]}>
                <div className="content__robot">
                    <RobotUIDs />
                </div>
            </RobotActionContext.Provider>
        </UIDsContext.Provider>
    );
}

function RobotUIDs() {
    const [UIDsState, setUIDsState] = useContext(UIDsContext);

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
        } else {
        };
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
                    {UIDsState.map((uid, index) => (
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
                                            <UIDSetting updateUIDsHandler={updateDataHandler} />
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

function UIDSetting({ updateUIDsHandler }) {
    const [UIDsState, setUIDsState] = useContext(UIDsContext);
    const [productsState, setProductsState] = useState({});

    const fetchProducts = useCallback(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "list-of-proudct" })

            window.electronAPIs.on("list-of-product", (_, response) => setProductsState(response.data));
        } else {
            fetch("http://localhost:3001/products")
                .then(res => res.json())
                .then(res => {
                    setProductsState(res);
                })
                .catch(err => new Error(err));
        }
    }, []);
    useEffect(() => { fetchProducts(); }, []);
    const addActionHandler = (e) => {
    };

    const Products = ({ productsState, onSelect }) => {
        // Xử lý tình huống không có sản phẩm
        if (!productsState || Object.keys(productsState).length === 0) {
            return <p>Loading products...</p>;
        }
    
        return (
            <select
                name="setting__action__products"
                onChange={(e) => onSelect(e.target.value)} // Gửi giá trị được chọn lên callback
            >
                {Object.entries(productsState).map(([key, value], index) => (
                    <option value={key} key={index}>
                        {`${key} (${value.length} items)`} {/* Hiển thị số lượng sản phẩm */}
                    </option>
                ))}
            </select>
        );
    };
    

    return (
        <React.Fragment>
            <h3>UID: {UIDsState.uid}</h3>
            <div className="setting__item__prev">
                {(UIDsState?.robot?.prev?.products && UIDsState.robot.prev.products.length > 0) && (
                    <>
                        <p>{UIDsState.robot.prev.products.length} lasted products</p>
                        <ul className="setting__prev-products">
                            {
                                UIDsState.robot.prev.products.map((prevProducts, index) => (
                                    <li key={index}>{prevProducts}</li>
                                ))
                            }
                        </ul>
                    </>
                )}
            </div>
            <div className="uid__setting__item">
                <button onClick={addActionHandler}>add</button>
                <div className="uid__setting__action">
                    <select name="setting__action__options">
                        <option value="marketplace">marketplace</option>
                        <option value="discussion">discussion</option>
                    </select>
                    <select name="setting__action__product-type">
                        {Object.keys(productsState).map((productKey, index) => (
                            <option value={productKey} key={index}>{productKey}</option>
                        ))}
                    </select>
                    <Products />
                </div>
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