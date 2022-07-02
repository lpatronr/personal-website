import { Post } from '../../../lib/utils/posts';
import styles from './styles.module.scss';

type Props = {
  filter: Post['type'] | 'all';
  handleSelectPost: (post: Post['type'] | 'all') => void;
  selectedPost: Post['type'] | 'all';
};

export default function FilterButton({
  filter,
  handleSelectPost,
  selectedPost,
}: Props): JSX.Element {
  const isSelected = filter === selectedPost;

  return (
    <button
      className={[styles.button, styles[filter]].join(' ')}
      onClick={() => handleSelectPost(filter)}>
      {filter} {isSelected && '✓'}
    </button>
  );
}
