import React from "react";
import { useState, useContext } from "react";

import { assets } from "../../assets/assets";
import { RenderContext } from "../../contexts/RenderContext";
import "./Navbar.css";

function Navbar() {
    const [renderState, setRenderState] = useContext(RenderContext);
    const [expandSearchState, setExpandSearchState] = useState(false);
    const [searchValueState, setSearchValueState] = useState("");

    const handleSearchBlur = () => { setExpandSearchState(false); };
    const handleSearchChange = (e) => { setSearchValueState(e.target.value); };
    const handleClickSearch = (e) => {
        setExpandSearchState(true);
        setTimeout(() => {
            const navbarSearchElm = e.target.closest(".navbar__search");
            const searchInputElm = navbarSearchElm.querySelector("input");
            searchInputElm.focus();
        }, 0);
    };
    const handleNavItemClicked = (e) => {
        const ariaData = e.target.closest(".navbar__item").getAttribute("data-page");
        setRenderState(prevState => ({
            ...prevState,
            page: ariaData,
        }));
    };

    return (
        <div className="navbar">
            <div className="navbar__items">
                {["home", "marketplace", "users"].map(page => (
                    <div
                        key={page}
                        className={`navbar__item navbar__${page} ${renderState.page === page ? "active" : ""}`}
                        data-page={page}
                        onClick={handleNavItemClicked}
                    >
                        <img src={assets[`${page}_icon`]} alt={page} className="navbar__icon" />
                    </div>
                ))}
            </div>
            <div className={`navbar__search ${expandSearchState ? "active" : ""}`}>
                <input type="text" onChange={handleSearchChange} onBlur={handleSearchBlur} value={searchValueState} />
                <div className="navbar__search__icon" onClick={handleClickSearch}>
                    <img src={assets.search_icon} alt="search" className="navbar__icon" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;