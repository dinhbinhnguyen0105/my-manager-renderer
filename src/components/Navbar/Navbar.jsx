import React, { useEffect } from "react";
import { useState, useContext } from "react";

import { assets } from "../../assets/assets";
import { RenderContext } from "../../contexts/RenderContext";
import "./Navbar.css";

function Navbar() {
    const [renderState, setRenderState] = useContext(RenderContext);
    const [expandSearchState, setExpandSearchState] = useState(false);
    const [searchValueState, setSearchValueState] = useState("");
    const [searchResultState, setSearchResultState] = useState({});

    useEffect(() => {
        if (window.electronAPIs) {
            switch (renderState.page) {
                case "users": {
                    window.electronAPIs.on("search-uid", (event, response) => {
                        console.log(response);
                        setSearchResultState({
                            data: response.data,
                            type: "search-uid"
                        });
                    });
                    return;
                };
                default: throw new Error("Invalid page in navbar [on]");
            }
        }
    }, []);

    const handleSearchBlur = () => { setExpandSearchState(false); };
    const handleSearchChange = (e) => {
        const listSearch = e.target.value.split("|");
        if (listSearch.length > 1 && listSearch[0].length > 2 && listSearch[1].length > 2) {
            if (window.electronAPIs) {
                switch (renderState.page) {
                    case "users": {
                        window.electronAPIs.send("request", {
                            request: "search-uid",
                            key: listSearch[0],
                            value: listSearch[1],
                        });
                        break;
                    }
                    default: throw new Error("Invalid page in navbar [send]")
                }
            }
        }
        setSearchValueState(e.target.value);
    };
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

    const SearchResult = () => {
        const resultItemClickhandler = e => {
            const dataUID = e.target.closest(".search__result__item").getAttribute("data-uid");
            setRenderState(prev => ({
                ...prev,
                content: "uid-info",
                uid: dataUID,
            }));
            console.log(renderState);
        }
        if (renderState.page === "users" && searchResultState.data && searchResultState.data.length) {
            
            return (
                
                    <div className="navbar__search__result">
                    {searchResultState.data.map((searchResult, index) => (
                        <div className="search__result__item" key={index} data-uid={searchResult.uid} onClick={resultItemClickhandler}>
                            <div className="result__item__uid">{searchResult.uid}</div>
                            <div className="result__item__username">{searchResult.username}</div>
                        </div>
                    ))}
                </div>
                
            );
        }
        return null;
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
                <SearchResult />
            </div>
        </div>
    );
}

export default Navbar;