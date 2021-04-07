import { useState } from 'react';
import { useHistory } from 'react-router';
import { editPost } from 'WebApi';

export default function EditModal({ isEdit, post, handleClose }) {
  const [content, setContent] = useState('');
  const history = useHistory();

  const _class = {
    true: 'modal block',
    false: 'modal',
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editPost(post.id, post.title, content).then((res) => {
      handleClose();
      history.push(`/posts/${res.id}`);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={_class[isEdit]}>
        <div
          className="modal-background"
          onClick={() => {
            handleClose();
          }}
        ></div>
        <div className="modal-card vertical-center">
          <header className="modal-card-head ">
            <p className="modal-card-title title-flow">Title: {post.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                handleClose();
              }}
            ></button>
          </header>
          <textarea
            className="modal-card-body text-height"
            onChange={handleChange}
            defaultValue={post.body}
          />

          <footer className="modal-card-foot">
            <button className="button is-success">Update</button>
            <button
              type="button"
              className="button"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </form>
  );
}
