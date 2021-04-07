import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { addPost } from 'WebApi';
import { LoadingContext } from 'Contexts';

export default function NewPost({ handleClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addPost(title, content).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message.toString());
      }
      setIsLoading(false);
      handleClose(e);
      history.push('/');
    });
  };
  return (
    <div className="new-post">
      <p className="title has-text-centered">New Post</p>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <label className="label left">Title</label>
            <input
              className="input"
              type="text"
              name="title"
              onChange={handleTitleChange}
              value={title}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label left">Content</label>
            <textarea
              className="textarea"
              name="content"
              onChange={handleContentChange}
              value={content}
            />
          </div>
        </div>

        <br />
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>
          <div className="control">
            <button className="button" type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
        {errorMessage && <div className="post-errorMessage">欄位不得為空</div>}
      </form>
    </div>
  );
}
