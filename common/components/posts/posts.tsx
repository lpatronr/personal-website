import { useState } from 'react';
import { Post } from '../../../lib/utils/posts';
import FilterButton from '../buttons/FilterButton';
import PostRow from '../post-row/PostRow';
import styles from './styles.module.scss';

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props): JSX.Element {
  const [selectedPost, setSelectedPost] = useState<Post['type'] | 'all'>('all');

  function handleSelectPost(post: Post['type'] | 'all') {
    setSelectedPost(post);
  }

  const filteredPosts: Post[] = posts.filter((post: Post) => {
    if (selectedPost === 'all') {
      return true;
    }
    return post.type === selectedPost;
  });

  return (
    <section className={styles.main}>
      <h1>Latest Updates</h1>
      <p className={styles.message}>Welcome 👋</p>

      <div className={styles.buttonsContainer}>
        <FilterButton
          selectedPost={selectedPost}
          handleSelectPost={handleSelectPost}
          filter={'all'}
        />
        <FilterButton
          selectedPost={selectedPost}
          handleSelectPost={handleSelectPost}
          filter={'project'}
        />
        <FilterButton
          selectedPost={selectedPost}
          handleSelectPost={handleSelectPost}
          filter={'blog'}
        />
        <FilterButton
          selectedPost={selectedPost}
          handleSelectPost={handleSelectPost}
          filter={'course'}
        />
      </div>

      <div className={styles.grid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: Post) => <PostRow key={post.id} post={post} />)
        ) : (
          <p>Whoops!</p>
        )}
      </div>
    </section>
  );
}
