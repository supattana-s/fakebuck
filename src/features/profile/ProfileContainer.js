import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";

import ProfileCover from "./ProfileCover";
import ProfileInfo from "./ProfileInfo";
import * as userService from "../../api/userApi";
import {
    FRIEND_STATUS_ACCEPTER,
    FRIEND_STATUS_ANNONYMOUS,
    FRIEND_STATUS_FRIEND,
    FRIEND_STATUS_ME,
    FRIEND_STATUS_REQUESTER,
} from "../../config/constant";
import { useAuth } from "../../contexts/AuthContext";

function ProfileContainer() {
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const [statusWithMe, setStatusWithMe] = useState("");

    const { startLoading, stopLoading } = useLoading();
    const { user: me } = useAuth();

    const { id } = useParams();

    useEffect(() => {
        const fetchUserFriends = async () => {
            try {
                startLoading();
                const res = await userService.getUserFriends(id);
                setUser(res.data.user);
                setFriends(res.data.friends);
                setStatusWithMe(res.data.statusWithMe);
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data.message);
            } finally {
                stopLoading();
            }
        };
        fetchUserFriends();
    }, [id, me, startLoading, stopLoading]);

    const changeStatusWithMe = (nextStatus) => {
        setStatusWithMe(nextStatus);
    };

    const deleteFriend = () => {
        const nextFriends = friends.filter((item) => item.id !== me.id);
        setFriends(nextFriends);
    };

    const createFriend = () => {
        setFriends([...friends, me]);
    };

    return (
        <div
            className="shadow-sm pb-2"
            style={{ backgroundImage: "linear-gradient(#f0f2f5, #fff)" }}
        >
            <ProfileCover coverImage={user.coverImage} />
            <ProfileInfo
                isMe={statusWithMe === FRIEND_STATUS_ME}
                user={user}
                friends={friends}
                isFriend={statusWithMe === FRIEND_STATUS_FRIEND}
                isAnonymous={statusWithMe === FRIEND_STATUS_ANNONYMOUS}
                isRequester={statusWithMe === FRIEND_STATUS_REQUESTER}
                isAccepter={statusWithMe === FRIEND_STATUS_ACCEPTER}
                changeStatusWithMe={changeStatusWithMe}
                deleteFriend={deleteFriend}
                createFriend={createFriend}
            />
        </div>
    );
}

export default ProfileContainer;
