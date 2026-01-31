import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import './App.css';

function App() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getAllCategories,
    getAllTags,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  // タスクをフィルタリングとソート
  const filteredAndSortedTodos = useMemo(() => {
    let filtered = [...todos];

    // ステータスでフィルタリング
    if (statusFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // カテゴリでフィルタリング
    if (categoryFilter) {
      filtered = filtered.filter(todo => todo.category === categoryFilter);
    }

    // タグでフィルタリング
    if (tagFilter) {
      filtered = filtered.filter(todo => todo.tags.includes(tagFilter));
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'createdAt-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'dueDate-desc':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [todos, statusFilter, categoryFilter, tagFilter, sortBy]);

  // タスクの統計情報
  const todoStats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos]);

  const handleAddTodo = (todoData) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } else {
      addTodo(todoData);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>React TODO アプリ</h1>
          <p className="app-subtitle">タスクを管理して生産性を向上させましょう</p>
        </header>

        <div className="app-content">
          <div className="main-section">
            <TodoForm
              onSubmit={handleAddTodo}
              editingTodo={editingTodo}
              onCancelEdit={handleCancelEdit}
              categories={getAllCategories()}
              tags={getAllTags()}
            />

            <div className="todos-section">
              <div className="todos-header">
                <h2>タスク一覧</h2>
                <span className="todos-count">
                  {filteredAndSortedTodos.length} 件
                </span>
              </div>

              <TodoList
                todos={filteredAndSortedTodos}
                onToggle={toggleTodo}
                onEdit={handleEditTodo}
                onDelete={deleteTodo}
              />
            </div>
          </div>

          <aside className="sidebar">
            <Filter
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              tagFilter={tagFilter}
              onTagFilterChange={setTagFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              categories={getAllCategories()}
              tags={getAllTags()}
              todoStats={todoStats}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
