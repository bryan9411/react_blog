import { Link } from 'react-router-dom';

export default function Post({ post }) {
  return (
    <div className="article">
      <h5>{new Date(post.createdAt).toLocaleString()}</h5>
      <Link className="title" to={`/posts/${post.id}`}>
        {post.title}
      </Link>
      <p className="content">{post.body}</p>
      <Link className="read-more " to={`/posts/${post.id}`}>
        Read more
      </Link>
    </div>
  );
}
