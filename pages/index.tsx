import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import FilterButton from '../common/components/buttons/FilterButton';
import PostRow from '../common/components/post-row/PostRow';
import MainLayout from '../common/layouts/MainLayout';
import { getPosts, Post } from '../lib/utils/posts';
import styles from '../styles/home.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getPosts();
  return {
    props: {
      allPosts,
    },
  };
};

const Home: NextPage = ({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts = allPosts as Post[];

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
    <MainLayout>
      <Head>
        <title>Lucas - Home</title>
        <meta name='description' content='Personal website' />
        <link rel='icon' href='/favicon/favicon.ico' />
      </Head>

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
    </MainLayout>
  );
};

export default Home;
