import React, { useState } from 'react';
import DarkModeToggle from 'components/DarkModeToggle';
export default function ToolBox({ search }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    console.log(value);
    search(value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setText('');
    search();
  };
  return (
    <div className="tool-box">
      <div className="logo">Article</div>
      <div className="search-box">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input search-input"
              type="text"
              placeholder="Search a article"
              value={text}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <button
              href="###"
              className="button is-primary"
              onClick={handleCancel}
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div to="/cart" className="cart-box">
        <DarkModeToggle />
      </div>
    </div>
  );
}
