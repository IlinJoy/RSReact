import type { CheckedItems } from '@/store/types';

import styles from './ListItem.module.scss';

type ListItemProps = { data: CheckedItems };

export function ListItem({ data }: ListItemProps) {
  return (
    <div className={styles.listItem}>
      <img className={styles.icon} src={data.image} alt={`${data.title} icon`} />
      <p>Title: {data.title}</p>
      <p>Episodes: {data.episodes || 0}</p>
    </div>
  );
}
