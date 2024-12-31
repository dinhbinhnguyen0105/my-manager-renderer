import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Users from "./pages/users/Users";

import { RenderProvider } from "./contexts/RenderContext";
import { ActionsProvider } from "./contexts/ActionCotnext";

function App() {

    return (
        <>
            <RenderProvider>
                <ActionsProvider>
                    <Navbar />
                    <div className="container">
                        <Sidebar />
                        <Users />
                    </div>
                </ActionsProvider>
            </RenderProvider>
        </>
    );
}

export default App;