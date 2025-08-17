import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { CheckedItem } from '@/store/types';

import styles from './ListItem.module.scss';

type ListItemProps = { data: CheckedItem };

export function ListItem({ data }: ListItemProps) {
  const t = useTranslations('FlyoutListItem');

  return (
    <div className={styles.listItem}>
      <Image
        width={42}
        height={42}
        className={styles.icon}
        src={data.image}
        alt={`${data.title} icon`}
      />
      <p>
        {t('title')} {data.title}
      </p>
      <p>
        {t('episodes')} {data.episodes || 0}
      </p>
    </div>
  );
}
