import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
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
  // validate string to be minimum 3 characters and maximum 12 characters with only A-Za-z0-9 characters
  const isValidTitle = (username: string) => {
    return username.length >= 3 && username.length <= 12 && /^[A-Za-z0-9]+$/.test(username);
  };
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

        <div className={styles.grid}>
          {allPosts.map((post: Post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
