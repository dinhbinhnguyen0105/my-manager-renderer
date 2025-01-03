import React, { useContext, useState } from "react";

import { ProductContext } from "../context/ProductContext";

function UIDAction() {
    const [products, setProducts] = useContext(ProductContext);
    const [productType, setProductType] = useState(Object.keys(products).length > 0 ? Object.keys(products)[0] : null);
    const [product, setProduct] = useState(products[productType].length > 0 ? products[productType][0]: null);

    console.log(products[productType]);

    return (
        <div className="uid__setting__action">
            <select name="setting__action__action-type" id="" className="setting__action__action-type">
                <option value="marketplace">marketplace</option>
                <option value="discussion">discussion</option>
            </select>
            <select
                name="setting__action__product-type"
                id=""
                className="setting__action__product-type"
                value={productType}
                onChange={e => setProductType(e.target.value)}
            >
                {Object.keys(products).map((productKey, index) => (
                    <option value={productKey} key={index}>
                        {productKey}
                    </option>
                ))}
            </select>
            <select
                name="setting__action__product-list"
                id=""
                value={product}
            >

            </select>
        </div>
    );
}

export default UIDAction;