import { Post } from '../../../lib/utils/posts';
import styles from './styles.module.scss';

type Props = {
  post: Post;
  title: string;
};

export default function Blog({ post, title }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>
        {new Date(post.date).toLocaleDateString('us', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
