import React, { useContext, useState } from "react";

import { ProductContext } from "../context/ProductContext";

function UIDAction() {
    const [products, setProducts] = useContext(ProductContext);
    console.log(products);
    // const [productCategory, setProductCategory] = useState(Object.keys(products).length > 0 ? Object.keys(products)[0] : undefined);
    // const [product, setProduct] = useState((products && products[productCategory]) ? Object.values(products[productCategory])[0] : undefined );
    
    // console.log(Object.values(products[productCategory]));

    return (
        <div className="uid__setting__action">
            <select name="setting__action__action-type" id="" className="setting__action__action-type">
                <option value="marketplace">marketplace</option>
                <option value="discussion">discussion</option>
            </select>
            {/* <select
                name="setting__action__product-type"
                id=""
                className="setting__action__product-type"
                value={productCategory}
                onChange={e => setProductCategory(e.target.value)}
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

            </select> */}
        </div>
    );
}

export default UIDAction;