export const Filter = ({
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  tagFilter,
  onTagFilterChange,
  sortBy,
  onSortByChange,
  categories,
  tags,
  todoStats,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3>フィルター</h3>

        <div className="filter-group">
          <label>ステータス</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('all')}
            >
              全て ({todoStats.total})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('active')}
            >
              未完了 ({todoStats.active})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('completed')}
            >
              完了 ({todoStats.completed})
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">カテゴリ</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">すべてのカテゴリ</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="tag-filter">タグ</label>
          <select
            id="tag-filter"
            value={tagFilter}
            onChange={(e) => onTagFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">すべてのタグ</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">並び替え</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="filter-select"
          >
            <option value="createdAt">作成日時（新しい順）</option>
            <option value="createdAt-asc">作成日時（古い順）</option>
            <option value="dueDate">期限（近い順）</option>
            <option value="dueDate-desc">期限（遠い順）</option>
            <option value="title">タイトル（A-Z）</option>
          </select>
        </div>
      </div>
    </div>
  );
};
