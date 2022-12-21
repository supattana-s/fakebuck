import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";
import Header from "../layouts/header/Header";

function Router() {
    const { user } = useAuth();
    return (
        <Routes>
            {user ? (
                <>
                    <Route path="/" element={<Header />} />
                    <Route path="/friend" element={<FriendPage />} />
                    <Route path="/profilr" element={<ProfilePage />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<LoginPage />} />
                </>
            )}
        </Routes>
    );
}

export default Router;
