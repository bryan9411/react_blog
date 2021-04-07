import React, { useEffect, useState } from 'react';
import Post from 'components/Post';
import { getAllPosts } from 'WebApi';
import ToolBox from 'components/ToolBox';
import avatar from '../images/avatar.png';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [sourcePosts, setSourcePosts] = useState([]);

  //從 api 拿資料
  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts);
      setSourcePosts(posts);
    });
  }, []);

  // 搜尋文章關鍵字
  const search = (text) => {
    let newPosts = [...sourcePosts];
    newPosts = newPosts.filter((post) => {
      const matchArry = post.title.match(new RegExp(text, 'gi'));
      return matchArry !== null;
    });
    setPosts(newPosts);
  };

  return (
    <>
      <ToolBox search={search} />
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
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </>
  );
}
