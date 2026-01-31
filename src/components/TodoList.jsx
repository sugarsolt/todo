import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>タスクがありません</p>
        <p className="empty-state-hint">上のフォームから新しいタスクを追加しましょう</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
