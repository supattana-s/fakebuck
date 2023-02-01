import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentContainer({ post, createComment }) {
    return (
        <div className="pb-2">
            <hr className="my-0 hr-sm" />
            <CommentList post={post} />
            <CommentForm post={post} createComment={createComment} />
        </div>
    );
}

export default CommentContainer;
