import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Users from "./pages/users/Users";

import { RenderProvider } from "./contexts/RenderContext";

function App() {

    return (
        <>
            <RenderProvider>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <Users />
                </div>
            </RenderProvider>
        </>
    );
}

export default App;