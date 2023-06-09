import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import { useClickOutside } from "../../hooks/useClickOutside";
import { timeSince } from "../../utils/dateFormat";

function PostHeader({
    post: {
        User: { id, firstName, lastName, profileImage },
        createdAt,
    },
}) {
    const [isOpen, setIsOpen] = useState(false);

    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const dropdownEl = useClickOutside(closeDropdown);

    return (
        <div className="d-flex align-items-center gap-2">
            <Link to={`/profile/${id}`}>
                <Avatar src={profileImage} size="40" />
            </Link>
            <div className="d-flex flex-column">
                <Link
                    to={`/profile/${id}`}
                    className="text-dark fw-bold no-underline hover-underline text-3.5"
                >
                    {firstName} {lastName}
                </Link>
                <small className="text-muted text-3">
                    {timeSince(createdAt)}
                </small>
            </div>
            <div className="flex-fill d-flex justify-content-end">
                <div className="dropdown" ref={dropdownEl}>
                    <button
                        className="btn rounded-circle position-relative h-9 w-9 hover-bg-gray-200"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <i className="fa-solid fa-ellipsis text-muted position-absolute top-50 left-50 translate-middle" />
                    </button>
                    <div
                        className={`dropdown-menu end-0 mt-1${
                            isOpen ? " d-block" : ""
                        }`}
                    >
                        <button className="dropdown-item">Edit</button>
                        <button className="dropdown-item">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostHeader;
