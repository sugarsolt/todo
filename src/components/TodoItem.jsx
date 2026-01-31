export const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  // 期限が過ぎているかチェック
  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  // 日付をフォーマット
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
      </div>

      <div className="todo-content">
        <label htmlFor={`todo-${todo.id}`} className="todo-title">
          {todo.title}
        </label>

        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}

        <div className="todo-meta">
          {todo.category && (
            <span className="todo-category">{todo.category}</span>
          )}

          {todo.tags && todo.tags.length > 0 && (
            <div className="todo-tags">
              {todo.tags.map((tag, index) => (
                <span key={index} className="todo-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {todo.dueDate && (
            <span className={`todo-due-date ${isOverdue() ? 'overdue' : ''}`}>
              期限: {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-edit"
          title="編集"
        >
          編集
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-delete"
          title="削除"
        >
          削除
        </button>
      </div>
    </div>
  );
};
