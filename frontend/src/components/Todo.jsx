const Todo = ({ todo, toggleDone, deleteTodo, addNewComment, newComments }) => {
  return (
    <li>
      <span className={todo.done ? "done" : ""}>{todo.title}</span>
      <button
        onClick={() => {
          toggleDone(todo.id);
        }}
      >
        Toggle
      </button>
      <button
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        ❌
      </button>
      {todo.comments && todo.comments.length > 0 && (
        <>
          <b>Comments:</b>
          <ul>
            {todo.comments.map((comment) => (
              <li key={comment.id}>{comment.message}</li>
            ))}
          </ul>
        </>
      )}
      <div className="new-comment-forms">
        <input
          type="text"
          value={newComments[todo.id] || ""}
          onChange={(e) => {
            const value = e.target.value;
            setNewComments({ ...newComments, [todo.id]: value });
          }}
        />

        <button
          onClick={() => {
            addNewComment(todo.id);
          }}
        >
          Add Comment
        </button>
      </div>
    </li>
  );
};

export default Todo;
