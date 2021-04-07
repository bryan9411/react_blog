import Layout from 'Layout';
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostInfo, deletePost } from 'WebApi';
import EditModal from 'components/EditModal';
import { AuthContext, LoadingContext } from 'Contexts';
import avatar from '../images/avatar.png';

function Post({ post, slug, setIsLoading }) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    deletePost(slug);
    setIsLoading(false);
    history.push('/');
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <div className="post-container">
        <div className="article">
          <div className="control">
            <div className="date">
              <h5>{new Date(post.createdAt).toLocaleString()}</h5>
            </div>
            {user && (
              <div className="control-button">
                <button
                  className="button is-danger"
                  type="button"
                  onClick={handleDelete}
                >
                  刪除
                </button>
                <button
                  className="button is-primary"
                  type="button"
                  onClick={handleEdit}
                >
                  編輯
                </button>
              </div>
            )}
          </div>
          <h1 className="title">{post.title}</h1>
          <p className="content">{post.body}</p>
          {isEdit && (
            <EditModal isEdit={isEdit} handleClose={handleClose} post={post} />
          )}
        </div>
      </div>
    </>
  );
}

export default function PostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [post, setPost] = useState([]);

  let { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPostInfo(slug).then((post) => setPost(post));
    setIsLoading(false);
  }, [slug, setIsLoading, post]);

  return (
    <Layout>
      <div className="article-container">
        <div className="article-logo">
          <div className="img">
            <img src={avatar} alt="Lidemy" />
          </div>
          <h5>About</h5>
          <div className="title">Lidemy</div>
          <p className="content">
            一個為初學者而生的線上程式課程平台
            <a href="https://lidemy.com/">https://lidemy.com/</a>
          </p>
        </div>
        <div className="articles">
          <Post
            post={post}
            key={post.id}
            slug={slug}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </Layout>
  );
}
