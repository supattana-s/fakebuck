import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";
import AuthLayout from "../layouts/auth/AuthLayout";

function Router() {
    const { user } = useAuth();
    return (
        <Routes>
            {user ? (
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/" element={<PostPage />} />
                    <Route path="/friend" element={<FriendPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            ) : (
                <>
                    <Route path="/" element={<LoginPage />} />
                </>
            )}
        </Routes>
    );
}

export default Router;
