import Link from 'next/link';
import { Post } from '../../../lib/utils/posts';
import styles from './styles.module.scss';

export default function PostRow({ post }: { post: Post }): JSX.Element {
  const title = post.id
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const publishedAt = new Date(post.date).toLocaleDateString('us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={post.type === 'video' ? post.content.trim() : `/post/${post.id}`}>
      <a className={styles.a}>
        <h6>
          {title} {post.type === 'video' && <span className={styles.videoTag}>VIDEO</span>}
        </h6>
        <p className={styles.date}>{publishedAt}</p>
        <p>{post.description}</p>
        <p className={styles.button}>Read more 👉</p>
      </a>
    </Link>
  );
}
