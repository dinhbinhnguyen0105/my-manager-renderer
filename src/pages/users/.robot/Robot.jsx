import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { updateDataHandler } from "../../../utils/utils";

import { ProductProvider } from "./context/ProductContext";
import { UIDProvider } from "./context/UIDContext";
import ListUID from "./listUID/ListUID";
import "./Robot.css";

function Robot() {

    return (
        <UIDProvider>
            <ProductProvider>
                <ListUID />
            </ProductProvider>
        </UIDProvider>
    );
}

export default Robot;