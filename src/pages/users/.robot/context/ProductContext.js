import React from "react";
import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState();

    useEffect(() => {
        if (window.electronAPIs) {
            window.electronAPIs.send("request", { request: "products", category: "real-estate" });
            window.electronAPIs.send("request", { request: "products", category: "fashion"});

            window.electronAPIs.on("list-of-product", (_, response) => {
                setProducts(response.data);

            });
        } else {
            fetch("http://localhost:3001/products")
                .then(res => res.json())
                .then(res => {
                    setProducts(res);
                })
                .catch(err => new Error(err));
        }
    }, []);

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {children}
        </ProductContext.Provider>
    );
}

export {
    ProductContext,
    ProductProvider,
};