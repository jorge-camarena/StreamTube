import Home from "./pages/Home";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { useState } from "react";
import { DashboardContext } from "./context/DashboardContext";

export interface UserInfo {
    username: string;
    roomName: string;
    youtubeLink: string;
}

function App() {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    function handleUserInfo(
        username: string,
        roomName: string,
        youtubeLink: string
    ) {
        setUserInfo({
            username,
            roomName,
            youtubeLink,
        });
    }

    return (
        <DashboardContext.Provider value={userInfo}>
            <Router>
                <Routes>
                    <Route
                        path="/home"
                        element={<Home updateUserInfo={handleUserInfo} />}
                    ></Route>
                    <Route path="/main" element={<Main />}></Route>
                </Routes>
            </Router>
        </DashboardContext.Provider>
    );
}

export default App;
