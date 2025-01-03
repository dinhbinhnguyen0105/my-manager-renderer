import React, { useContext, useState } from "react";

import UIDAction from "./UIDAction";
import { ProductContex } from "../context/ProductContext";

function UIDSetting({ uid, updateUIDsHandler }) {
    const [actionElms, setActionElms] = useState([]);

    const addActionHandler = (e) => {

    }

    return (
        <tr className="uid__setting table__row">
            <td colSpan={5}>
                <h3>UID: {uid.uid}</h3>
                <div className="uid__setting__prev">
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
                <div className="uid__setting__actions">
                    <button onClick={addActionHandler}>Add</button>
                    <UIDAction />
                </div>
            </td>
        </tr>
    );
}

export default UIDSetting;