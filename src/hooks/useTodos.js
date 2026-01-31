import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

// ユニーク ID を生成
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // 初期化: ローカルストレージから読み込み
  useEffect(() => {
    const loadedTodos = storage.getTodos();
    setTodos(loadedTodos);
  }, []);

  // todos が変更されたらローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0 || storage.getTodos().length > 0) {
      storage.saveTodos(todos);
    }
  }, [todos]);

  // タスクを追加
  const addTodo = (todoData) => {
    const newTodo = {
      id: generateId(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      category: todoData.category || '',
      tags: todoData.tags || [],
      dueDate: todoData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  // タスクを更新
  const updateTodo = (id, updatedData) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  // タスクを削除
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // タスクの完了状態を切り替え
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  // すべてのカテゴリを取得
  const getAllCategories = () => {
    const categories = todos
      .map(todo => todo.category)
      .filter(category => category);
    return [...new Set(categories)];
  };

  // すべてのタグを取得
  const getAllTags = () => {
    const tags = todos
      .flatMap(todo => todo.tags)
      .filter(tag => tag);
    return [...new Set(tags)];
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getAllCategories,
    getAllTags,
  };
};
