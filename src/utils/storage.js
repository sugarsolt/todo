const STORAGE_KEY = 'react-todo-app';

export const storage = {
  // ローカルストレージから TODO データを取得
  getTodos: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      return [];
    }
  },

  // ローカルストレージに TODO データを保存
  saveTodos: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  },

  // ローカルストレージをクリア
  clearTodos: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear todos from localStorage:', error);
    }
  }
};
