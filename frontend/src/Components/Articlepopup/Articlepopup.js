import React, { useState, useEffect } from "react";
import "./Articlepopup.css"; // Import CSS file for styling
import articleService from "../../Service/articleService";

const ArticlePopup = ({ article, onClose, categories, onUpdate }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [category, setCategory] = useState(article.category);

  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
    setCategory(article.category.id);
  }, [article]);

  // Handle save and close
  const handleSave = () => {
    const updatedArticle = {
      ...article,
      title,
      content,
      category: categories.find((cat) => cat.id === category),
    };
    onUpdate(updatedArticle);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        <h2>Edit Article</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <button className="popup-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ArticlePopup;
