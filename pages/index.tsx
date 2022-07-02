import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Posts from '../common/components/posts/posts';
import MainLayout from '../common/layouts/MainLayout';
import { getPosts } from '../lib/utils/posts';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getPosts();
  return {
    props: {
      allPosts,
    },
  };
};

const Home: NextPage = ({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <Head>
        <title>Lucas - Home</title>
        <meta name='description' content='Personal website' />
        <link rel='icon' href='/favicon/favicon.ico' />
      </Head>

      <Posts posts={allPosts} />
    </MainLayout>
  );
};

export default Home;
