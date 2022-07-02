import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Post } from '../../../lib/utils/posts';
import styles from './styles.module.scss';

export function PostRow({ post }: { post: Post }): JSX.Element {
  const publishedAt = new Date(post.date).toLocaleDateString('us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let color = styles.tag;
  switch (post.type) {
    case 'blog':
      color = styles.blog;
      break;
    case 'video':
      color = styles.video;
      break;
    case 'course':
      color = styles.course;
      break;
    case 'project':
      color = styles.project;
      break;
    default:
      break;
  }

  return (
    <Link href={post.type !== 'blog' ? post.content.trim() : `/post/${post.id}`}>
      <a className={styles.a}>
        <h6>
          {post.title}{' '}
          <span className={[styles.tag, color].join(' ')}>{post.type.toUpperCase()}</span>
        </h6>
        <p className={styles.date}>{publishedAt}</p>
        <p>{post.description}</p>
        <p className={styles.button}>{post.type === 'blog' ? 'Read more' : 'Watch now'}</p>
      </a>
    </Link>
  );
}

export default dynamic(() => Promise.resolve(PostRow), { ssr: false });
