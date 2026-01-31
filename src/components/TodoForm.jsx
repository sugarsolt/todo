import { useState, useEffect } from 'react';

export const TodoForm = ({ onSubmit, editingTodo, onCancelEdit, categories, tags }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    dueDate: '',
  });

  // 編集モードの場合、フォームに既存のデータを設定
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || '',
        category: editingTodo.category || '',
        tags: editingTodo.tags ? editingTodo.tags.join(', ') : '',
        dueDate: editingTodo.dueDate ? editingTodo.dueDate.split('T')[0] : '',
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    const todoData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    onSubmit(todoData);

    // フォームをリセット
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      dueDate: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      dueDate: '',
    });
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'タスクを編集' : '新しいタスクを追加'}</h2>

      <div className="form-group">
        <label htmlFor="title">タイトル *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="タスクのタイトルを入力"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="タスクの詳細を入力（オプション）"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">カテゴリ</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="例: 仕事, 個人"
            list="categories-list"
          />
          <datalist id="categories-list">
            {categories.map(cat => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">期限</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">タグ</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="タグをカンマ区切りで入力（例: 重要, 緊急）"
          list="tags-list"
        />
        <datalist id="tags-list">
          {tags.map(tag => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? '更新' : '追加'}
        </button>
        {editingTodo && (
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};
