import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import Blog from '../../common/components/post/post';
import MainLayout from '../../common/layouts/MainLayout';
import { getAllPostsIds, getPostFromId } from '../../lib/utils/posts';

export async function getStaticPaths() {
  const paths: { params: { id: string } }[] = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const post = await getPostFromId(id);
  return {
    props: {
      post,
    },
  };
};

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  useEffect(() => {
    if (post.id === 'video') {
      Router.push(post.content.trim());
    }
  }, [post]);

  const title: string = post.id
    .replace(/-/g, ' ')
    .replace(/(\w)(\w*)/g, function (_: string, g1: string, g2: string) {
      return g1.toUpperCase() + g2.toLowerCase();
    });

  return (
    <MainLayout>
      <Head>
        <title>{`Lucas - ${title}`}</title>
      </Head>

      {post && post.type === 'blog' && <Blog post={post} title={title} />}
      {post && post.type === 'video' && (
        <h1 style={{ textAlign: 'center', padding: '8rem' }}>What are you doing here?</h1>
      )}
    </MainLayout>
  );
}
